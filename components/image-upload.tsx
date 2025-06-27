"use client"

import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Image as ImageIcon, Loader2, CheckCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCompleteUpload, useDeleteFromS3 } from "@/hooks/use-s3-upload"
import { toast } from "sonner"

interface ImageFile {
  file: File
  preview: string
  id: string
  uploadStatus: 'pending' | 'uploading' | 'success' | 'error'
  publicUrl?: string
  s3Key?: string
  errorMessage?: string
}

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
}

export function ImageUpload({ 
  value = [], 
  onChange, 
  maxFiles = 3, 
  maxSize = 500 * 1024 // 500KB 
}: ImageUploadProps) {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  
  const completeUpload = useCompleteUpload()
  const deleteFromS3 = useDeleteFromS3()

  // Upload single image to S3
  const uploadImage = async (file: File): Promise<{ publicUrl: string; key: string }> => {
    try {
      const result = await completeUpload.mutateAsync(file)
      return result
    } catch (error) {
      console.error('Upload error:', error)
      throw new Error(error instanceof Error ? error.message : 'Upload failed')
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const remainingSlots = maxFiles - imageFiles.length
    const filesToProcess = acceptedFiles.slice(0, remainingSlots)

    const newImageFiles: ImageFile[] = filesToProcess.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      uploadStatus: 'pending'
    }))

    setImageFiles(prev => [...prev, ...newImageFiles])
  }, [imageFiles.length, maxFiles])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize,
    maxFiles: maxFiles - imageFiles.length,
    disabled: imageFiles.length >= maxFiles
  })

  const removeImage = async (id: string) => {
    const imageToRemove = imageFiles.find(img => img.id === id)
    
    // If image was successfully uploaded to S3, delete it from S3
    if (imageToRemove?.uploadStatus === 'success' && imageToRemove.s3Key) {
      try {
        await deleteFromS3.mutateAsync({ key: imageToRemove.s3Key })
        toast.success('Image deleted successfully')
      } catch (error) {
        console.error('Delete error:', error)
        toast.error('Failed to delete image from storage')
        return // Don't remove from UI if S3 deletion failed
      }
    }

    setImageFiles(prev => {
      const filtered = prev.filter(img => img.id !== id)
      const urlsToKeep = filtered
        .filter(img => img.uploadStatus === 'success')
        .map(img => img.publicUrl)
        .filter(Boolean) as string[]
      
      onChange(urlsToKeep)
      return filtered
    })

    // Clean up preview URL
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview)
    }
  }

  const uploadAllImages = async () => {
    const pendingImages = imageFiles.filter(img => img.uploadStatus === 'pending')
    if (pendingImages.length === 0) return

    setIsUploading(true)
    
    try {
      const uploadPromises = pendingImages.map(async (imageFile) => {
        // Update status to uploading
        setImageFiles(prev => prev.map(img => 
          img.id === imageFile.id 
            ? { ...img, uploadStatus: 'uploading' as const, errorMessage: undefined }
            : img
        ))

        try {
          const result = await uploadImage(imageFile.file)
          
          // Update status to success
          setImageFiles(prev => prev.map(img => 
            img.id === imageFile.id 
              ? { 
                  ...img, 
                  uploadStatus: 'success' as const,
                  publicUrl: result.publicUrl,
                  s3Key: result.key,
                  errorMessage: undefined
                }
              : img
          ))

          return result.publicUrl
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Upload failed'
          
          // Update status to error
          setImageFiles(prev => prev.map(img => 
            img.id === imageFile.id 
              ? { 
                  ...img, 
                  uploadStatus: 'error' as const,
                  errorMessage
                }
              : img
          ))
          
          toast.error(`Failed to upload ${imageFile.file.name}: ${errorMessage}`)
          throw error
        }
      })

      const uploadResults = await Promise.allSettled(uploadPromises)
      const successfulUrls = uploadResults
        .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
        .map(result => result.value)
      
      if (successfulUrls.length > 0) {
        onChange([...value, ...successfulUrls])
        toast.success(`Successfully uploaded ${successfulUrls.length} image(s)`)
      }

      const failedCount = uploadResults.filter(result => result.status === 'rejected').length
      if (failedCount > 0) {
        toast.error(`${failedCount} image(s) failed to upload`)
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload process failed')
    } finally {
      setIsUploading(false)
    }
  }

  // Retry failed upload
  const retryUpload = async (imageFile: ImageFile) => {
    setImageFiles(prev => prev.map(img => 
      img.id === imageFile.id 
        ? { ...img, uploadStatus: 'uploading' as const, errorMessage: undefined }
        : img
    ))

    try {
      const result = await uploadImage(imageFile.file)
      
      setImageFiles(prev => prev.map(img => 
        img.id === imageFile.id 
          ? { 
              ...img, 
              uploadStatus: 'success' as const,
              publicUrl: result.publicUrl,
              s3Key: result.key,
              errorMessage: undefined
            }
          : img
      ))

      // Update the parent component with new URL
      const currentSuccessUrls = imageFiles
        .filter(img => img.uploadStatus === 'success' && img.id !== imageFile.id)
        .map(img => img.publicUrl)
        .filter(Boolean) as string[]
      
      onChange([...currentSuccessUrls, result.publicUrl])
      toast.success('Image uploaded successfully')
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setImageFiles(prev => prev.map(img => 
        img.id === imageFile.id 
          ? { ...img, uploadStatus: 'error' as const, errorMessage }
          : img
      ))
      
      toast.error(`Failed to upload ${imageFile.file.name}: ${errorMessage}`)
    }
  }

  const hasUploadableImages = imageFiles.some(img => img.uploadStatus === 'pending')
  const allImagesUploaded = imageFiles.length > 0 && imageFiles.every(img => img.uploadStatus === 'success')
  const hasErrors = imageFiles.some(img => img.uploadStatus === 'error')

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imageFiles.forEach(imageFile => {
        if (imageFile.preview) {
          URL.revokeObjectURL(imageFile.preview)
        }
      })
    }
  }, [])

  // Cleanup preview URLs when imageFiles change
  useEffect(() => {
    const currentPreviews = imageFiles.map(img => img.preview)
    return () => {
      currentPreviews.forEach(preview => {
        if (preview) {
          URL.revokeObjectURL(preview)
        }
      })
    }
  }, [imageFiles])

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      {imageFiles.length < maxFiles && (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-border hover:border-primary/50 transition-colors p-8 text-center cursor-pointer",
            isDragActive && "border-primary bg-primary/5",
            imageFiles.length >= maxFiles && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                {isDragActive ? "Drop images here" : "Upload Images"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or click to select ({maxFiles - imageFiles.length} remaining)
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Badge variant="secondary">JPG, JPEG, PNG</Badge>
                <Badge variant="secondary">Max {Math.round(maxSize / 1024)}KB each</Badge>
                <Badge variant="secondary">Up to {maxFiles} images</Badge>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <Card className="p-4 border-destructive/50 bg-destructive/5">
          <p className="text-sm font-medium text-destructive mb-2">Some files were rejected:</p>
          <ul className="text-sm text-destructive space-y-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name}: {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Image Previews */}
      {imageFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">Image Previews</h3>
            {hasUploadableImages && (
              <Button 
                onClick={uploadAllImages} 
                disabled={isUploading}
                size="sm"
                className="gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload All
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageFiles.map((imageFile) => (
              <Card key={imageFile.id} className="relative group overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={imageFile.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Overlay */}
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    {imageFile.uploadStatus === 'pending' && (
                      <Badge variant="secondary" className="gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Ready to upload
                      </Badge>
                    )}
                    {imageFile.uploadStatus === 'uploading' && (
                      <Badge className="gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </Badge>
                    )}
                    {imageFile.uploadStatus === 'success' && (
                      <Badge variant="default" className="gap-2 bg-chart-3 hover:bg-chart-3">
                        <CheckCircle className="w-4 h-4" />
                        Uploaded
                      </Badge>
                    )}
                    {imageFile.uploadStatus === 'error' && (
                      <div className="flex flex-col items-center space-y-2">
                        <Badge variant="destructive" className="gap-2">
                          <X className="w-4 h-4" />
                          Failed
                        </Badge>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => retryUpload(imageFile)}
                          className="gap-2 h-8 text-xs"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(imageFile.id)}
                    disabled={deleteFromS3.isPending}
                  >
                    {deleteFromS3.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">
                    {imageFile.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(imageFile.file.size / 1024)}KB
                  </p>
                  {imageFile.uploadStatus === 'error' && imageFile.errorMessage && (
                    <p className="text-xs text-destructive mt-1 truncate" title={imageFile.errorMessage}>
                      {imageFile.errorMessage}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {allImagesUploaded && (
            <Card className="p-4 border-chart-3/50 bg-chart-3/5">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-chart-3" />
                <p className="text-sm font-medium text-foreground">
                  All images uploaded successfully!
                </p>
              </div>
            </Card>
          )}

          {hasErrors && (
            <Card className="p-4 border-destructive/50 bg-destructive/5">
              <div className="flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Some uploads failed
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click the retry button on failed images to try again
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
