import React, { useCallback, useState } from 'react'
import { Button, Card, Flex, Stack, Text, useToast } from '@sanity/ui'
import { set } from 'sanity'
import { useClient } from 'sanity'
import { ArrayOfObjectsInputProps } from 'sanity'

// Simple random key generator
const randomKey = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

export const BulkMediaInput = (props: ArrayOfObjectsInputProps) => {
    const { onChange, value } = props
    const client = useClient({ apiVersion: '2024-01-01' })
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
        const newItems: any[] = []

        // Calculate starting order based on existing items
        const currentItems = (value || []) as any[]
        let nextOrder = currentItems.length + 1

        try {
            // Upload images sequentially
            for (const file of filesToUpload) {
                try {
                    const asset = await client.assets.upload('image', file)

                    // Create the mediaItem structure expected by galleryItem schema
                    newItems.push({
                        _type: 'mediaItem',
                        _key: randomKey(),
                        mediaType: 'image',
                        image: {
                            _type: 'image',
                            asset: {
                                _type: 'reference',
                                _ref: asset._id
                            },
                            alt: ''
                        },
                        caption: '',
                        order: nextOrder++
                    })
                } catch (err) {
                    console.error('Upload failed for file:', file.name, err)
                    toast.push({
                        status: 'error',
                        title: `Failed to upload ${file.name}`
                    })
                }
            }

            if (newItems.length > 0) {
                // Append new items to existing ones
                onChange(set([...currentItems, ...newItems]))

                toast.push({
                    status: 'success',
                    title: `Successfully added ${newItems.length} media items`
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
    }, [filesToUpload, client, onChange, value, toast])

    return (
        <Stack space={3}>
            <Card padding={3} border radius={2} tone="primary">
                <Stack space={3}>
                    <Text weight="semibold" size={1}>Bulk Upload Event Photos</Text>
                    <Text size={1} muted>Select multiple photos to add them to this event. They will be automatically formatted as Media Items.</Text>

                    <Flex align="center" gap={3}>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            disabled={uploading}
                            style={{ display: 'block', width: '100%' }}
                        />
                        <Button
                            text={uploading ? 'Uploading...' : `Add ${filesToUpload.length > 0 ? filesToUpload.length : ''} Photos`}
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
