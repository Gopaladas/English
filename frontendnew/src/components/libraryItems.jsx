// src/App.jsx
import React from 'react';
import Carousel from './Carousel';

// Sample data with placeholder images and PDF links
const stories = [
  { image: 'https://picsum.photos/id/1011/400/300', title: 'Story Title 1', pdf: '/path/to/story1.pdf' },
  { image: 'https://picsum.photos/id/1012/400/300', title: 'Story Title 2', pdf: '/path/to/story2.pdf' },
  { image: 'https://picsum.photos/id/1013/400/300', title: 'Story Title 3', pdf: '/path/to/story3.pdf' },
  { image: 'https://picsum.photos/id/1014/400/300', title: 'Story Title 4', pdf: '/path/to/story4.pdf' },
  { image: 'https://picsum.photos/id/1015/400/300', title: 'Story Title 5', pdf: '/path/to/story5.pdf' },
  { image: 'https://picsum.photos/id/1011/400/300', title: 'Story Title 6', pdf: '/path/to/story6.pdf' },
  { image: 'https://picsum.photos/id/1012/400/300', title: 'Story Title 7', pdf: '/path/to/story7.pdf' },
  { image: 'https://picsum.photos/id/1013/400/300', title: 'Story Title 8', pdf: '/path/to/story8.pdf' },
  { image: 'https://picsum.photos/id/1014/400/300', title: 'Story Title 9', pdf: '/path/to/story9.pdf' },
  { image: 'https://picsum.photos/id/1015/400/300', title: 'Story Title 10', pdf: '/path/to/story10.pdf' },
];

const journals = [
  { image: 'https://picsum.photos/id/1021/400/300', title: 'Journal Title 1', pdf: '/path/to/journal1.pdf' },
  { image: 'https://picsum.photos/id/1022/400/300', title: 'Journal Title 2', pdf: '/path/to/journal2.pdf' },
  { image: 'https://picsum.photos/id/1023/400/300', title: 'Journal Title 3', pdf: '/path/to/journal3.pdf' },
  { image: 'https://picsum.photos/id/1024/400/300', title: 'Journal Title 4', pdf: '/path/to/journal4.pdf' },
  { image: 'https://picsum.photos/id/1025/400/300', title: 'Journal Title 5', pdf: '/path/to/journal5.pdf' },
  { image: 'https://picsum.photos/id/1021/400/300', title: 'Journal Title 6', pdf: '/path/to/journal6.pdf' },
  { image: 'https://picsum.photos/id/1022/400/300', title: 'Journal Title 7', pdf: '/path/to/journal7.pdf' },
  { image: 'https://picsum.photos/id/1023/400/300', title: 'Journal Title 8', pdf: '/path/to/journal8.pdf' },
  { image: 'https://picsum.photos/id/1024/400/300', title: 'Journal Title 9', pdf: '/path/to/journal9.pdf' },
  { image: 'https://picsum.photos/id/1025/400/300', title: 'Journal Title 10', pdf: '/path/to/journal10.pdf' },
];

const reviews = [
  { image: 'https://picsum.photos/id/1031/400/300', title: 'Review Title 1', pdf: '/path/to/review1.pdf' },
  { image: 'https://picsum.photos/id/1032/400/300', title: 'Review Title 2', pdf: '/path/to/review2.pdf' },
  { image: 'https://picsum.photos/id/1033/400/300', title: 'Review Title 3', pdf: '/path/to/review3.pdf' },
  { image: 'https://picsum.photos/id/1034/400/300', title: 'Review Title 4', pdf: '/path/to/review4.pdf' },
  { image: 'https://picsum.photos/id/1035/400/300', title: 'Review Title 5', pdf: '/path/to/review5.pdf' },
  { image: 'https://picsum.photos/id/1031/400/300', title: 'Review Title 6', pdf: '/path/to/review6.pdf' },
  { image: 'https://picsum.photos/id/1032/400/300', title: 'Review Title 7', pdf: '/path/to/review7.pdf' },
  { image: 'https://picsum.photos/id/1033/400/300', title: 'Review Title 8', pdf: '/path/to/review8.pdf' },
  { image: 'https://picsum.photos/id/1034/400/300', title: 'Review Title 9', pdf: '/path/to/review9.pdf' },
  { image: 'https://picsum.photos/id/1035/400/300', title: 'Review Title 10', pdf: '/path/to/review10.pdf' },
];

const library = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="marquee-container">
        <h1 className="marquee text-4xl font-bold my-8">Our Department's Library</h1>
      </div>
      <Carousel items={stories} title="Stories" />
      <Carousel items={journals} title="Journals" />
      <Carousel items={reviews} title="Reviews" />
    </div>
  );
};

export default library;