import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
function urlFor(source: any) {
  return builder.image(source);
}

interface PortableTextRendererProps {
  content: any;
  className?: string;
}

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderBlock = (block: any, index: number) => {
    // Handle different block types
    switch (block._type) {
      case 'block':
        return renderTextBlock(block, index);
      case 'image':
        return renderImage(block, index);
      default:
        return null;
    }
  };

  const renderTextBlock = (block: any, index: number) => {
    if (!block.children) return null;
    
    const text = block.children
      .map((child: any) => child.text || '')
      .join('');

    // Handle different styles
    switch (block.style) {
      case 'h1':
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
            {renderInlineContent(block.children)}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
            {renderInlineContent(block.children)}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-5">
            {renderInlineContent(block.children)}
          </h3>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-green-500 pl-4 py-2 my-6 bg-green-50 text-gray-700 italic">
            {renderInlineContent(block.children)}
          </blockquote>
        );
      default:
        // Normal paragraph
        return (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {renderInlineContent(block.children)}
          </p>
        );
    }
  };

  const renderInlineContent = (children: any[]) => {
    return children.map((child: any, index: number) => {
      if (!child.marks || child.marks.length === 0) {
        return <span key={index}>{child.text}</span>;
      }

      let element = <span key={index}>{child.text}</span>;

      // Apply marks (formatting)
      child.marks.forEach((mark: string) => {
        switch (mark) {
          case 'strong':
            element = <strong key={index}>{element}</strong>;
            break;
          case 'em':
            element = <em key={index}>{element}</em>;
            break;
          case 'underline':
            element = <u key={index}>{element}</u>;
            break;
        }
      });

      return element;
    });
  };

  const renderImage = (block: any, index: number) => {
    if (!block.asset?._ref) {
      return null;
    }

    return (
      <div key={index} className="my-8">
        <img
          src={urlFor(block).width(800).height(600).fit('max').auto('format').url()}
          alt={block.alt || 'News image'}
          className="w-full h-auto rounded-lg shadow-md"
        />
        {block.alt && (
          <p className="mt-2 text-sm text-gray-600 text-center italic">
            {block.alt}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`prose max-w-none ${className}`}>
      {content.map((block: any, index: number) => renderBlock(block, index))}
    </div>
  );
};

export default PortableTextRenderer;