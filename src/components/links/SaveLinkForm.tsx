import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, TagInput, Tag, HStack } from '@chakra-ui/react';
import { links } from '../../services/api';
import { SaveLinkRequest } from '../../types';

export function SaveLinkForm() {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data: SaveLinkRequest = { url, tags };
      await links.save(data);
      toast({
        title: 'Link saved successfully',
        status: 'success',
        duration: 3000,
      });
      setUrl('');
      setTags([]);
    } catch (error) {
      toast({
        title: 'Failed to save link',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px">
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>URL</FormLabel>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <Input
            placeholder="Add tags..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const target = e.target as HTMLInputElement;
                if (target.value.trim()) {
                  handleAddTag(target.value.trim());
                  target.value = '';
                }
              }
            }}
          />
          <HStack spacing={2} mt={2} wrap="wrap">
            {tags.map((tag) => (
              <Tag
                key={tag}
                size="md"
                variant="solid"
                colorScheme="blue"
                onClose={() => handleRemoveTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Saving"
        >
          Save Link
        </Button>
      </VStack>
    </Box>
  );
}