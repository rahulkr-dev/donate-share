import { useMutation } from '@tanstack/react-query'

interface UploadRequestData {
  filename: string
  contentType: string
  size: number
}

interface UploadResponse {
  presignedUrl: string
  key: string
  publicUrl: string
}

interface DeleteRequest {
  key: string
}

// Hook for getting presigned URL
export function useGetPresignedUrl() {
  return useMutation({
    mutationFn: async (data: UploadRequestData): Promise<UploadResponse> => {
      const response = await fetch('/api/s3/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to get presigned URL')
      }

      return response.json()
    },
  })
}

// Hook for uploading file to S3
export function useUploadToS3() {
  return useMutation({
    mutationFn: async ({ file, presignedUrl }: { file: File; presignedUrl: string }) => {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to upload file to S3')
      }

      return response
    },
  })
}

// Hook for deleting file from S3
export function useDeleteFromS3() {
  return useMutation({
    mutationFn: async (data: DeleteRequest) => {
      const response = await fetch('/api/s3/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to delete file from S3')
      }

      return response.json()
    },
  })
}

// Complete upload process (get presigned URL + upload file)
export function useCompleteUpload() {
  const getPresignedUrl = useGetPresignedUrl()
  const uploadToS3 = useUploadToS3()

  return useMutation({
    mutationFn: async (file: File): Promise<{ publicUrl: string; key: string }> => {
      // Step 1: Get presigned URL
      const uploadData = await getPresignedUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      })

      // Step 2: Upload file to S3 using presigned URL
      await uploadToS3.mutateAsync({
        file,
        presignedUrl: uploadData.presignedUrl,
      })

      // Step 3: Return the public URL and key
      return {
        publicUrl: uploadData.publicUrl,
        key: uploadData.key,
      }
    },
  })
}
