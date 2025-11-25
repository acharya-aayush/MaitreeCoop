import {useCallback, useState} from 'react'
import {Box, Button, Card, Flex, Grid, Stack, Text, ToastProvider, useToast} from '@sanity/ui'
import {set, unset, useFormValue} from 'sanity'
import {useClient} from 'sanity'

export const BulkImageInput = (props: any) => {
  const {onChange} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const toast = useToast()
  const [uploading, setUploading] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFilesToUpload(Array.from(event.target.files))
    }
  }

  const handleUpload = useCallback(async () => {
    if (filesToUpload.length === 0) return

    setUploading(true)
    const uploadedAssets: any[] = []

    try {
      // Upload images sequentially to avoid overwhelming the browser/network
      for (const file of filesToUpload) {
        try {
          const asset = await client.assets.upload('image', file)
          uploadedAssets.push({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            },
            // Default empty fields
            alt: '',
            caption: ''
          })
        } catch (err) {
          console.error('Upload failed for file:', file.name, err)
          toast.push({
            status: 'error',
            title: `Failed to upload ${file.name}`
          })
        }
      }

      if (uploadedAssets.length > 0) {
        // Get current images or empty array
        const currentImages = props.value || []
        
        // Append new images to existing ones
        onChange(set([...currentImages, ...uploadedAssets]))
        
        toast.push({
          status: 'success',
          title: `Successfully uploaded ${uploadedAssets.length} images`
        })
        
        // Clear selection
        setFilesToUpload([])
      }
    } catch (error) {
      console.error('Bulk upload error:', error)
      toast.push({
        status: 'error',
        title: 'Bulk upload failed'
      })
    } finally {
      setUploading(false)
    }
  }, [filesToUpload, client, onChange, props.value, toast])

  return (
    <Stack space={3}>
      <Card padding={3} border radius={2}>
        <Stack space={3}>
          <Text weight="semibold" size={1}>Bulk Upload Images</Text>
          <Text size={1} muted>Select multiple images to upload them all at once. They will be appended to the list below.</Text>
          
          <Flex align="center" gap={3}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              style={{display: 'block', width: '100%'}}
            />
            <Button
              text={uploading ? 'Uploading...' : `Upload ${filesToUpload.length > 0 ? filesToUpload.length : ''} Images`}
              tone="primary"
              onClick={handleUpload}
              disabled={filesToUpload.length === 0 || uploading}
              loading={uploading}
            />
          </Flex>
        </Stack>
      </Card>
      
      {/* Default array input rendering */}
      {props.renderDefault(props)}
    </Stack>
  )
}
