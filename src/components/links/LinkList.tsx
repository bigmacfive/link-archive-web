import { useEffect, useState } from 'react';
import { Box, VStack, Text, Tag, HStack, Heading, useToast } from '@chakra-ui/react';
import { links } from '../../services/api';
import { Link } from '../../types';

export function LinkList() {
  const [linkList, setLinkList] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await links.getAll();
      setLinkList(response.data.links);
    } catch (error) {
      toast({
        title: 'Failed to fetch links',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack spacing={4} align="stretch" w="100%" maxW="800px">
      {linkList.map((link) => (
        <Box
          key={link.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          shadow="sm"
        >
          <VStack align="stretch" spacing={3}>
            <Heading as="h3" size="md">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </Heading>
            <Text color="gray.600" fontSize="sm">
              {link.preview}
            </Text>
            <Text>{link.summary}</Text>
            <HStack spacing={2}>
              {link.tags.map((tag) => (
                <Tag key={tag} size="sm" colorScheme="blue">
                  {tag}
                </Tag>
              ))}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              Saved on {new Date(link.created_at).toLocaleDateString()}
            </Text>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}