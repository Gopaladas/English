import React, { useState } from 'react';

const Achievements = () => {
  // State to manage visibility of galleries
  const [visibleGallery, setVisibleGallery] = useState(null);

  // Achievements data with uneven points and colors
  const achievements = [
    {
      title: 'Academic Excellence',
      color: 'text-blue-600',
      borderColor: 'border-blue-600',
      description: [
        'Consistently achieving high pass rates in university examinations.',
        'Excellent performance in competitive language proficiency tests.',
        'Recognition by academic institutions for outstanding student results.',
        'Awards and honors for excellence in academic achievements.',
        'Special training programs for high-achieving students.',
      ],
      images: ['/images/academic1.jpg', '/images/academic2.jpg']
    },
    {
      title: 'Research Contributions',
      color: 'text-green-600',
      borderColor: 'border-green-600',
      description: [
        'Publishing numerous research papers in national and international journals.',
        'Books authored by faculty on diverse topics.',
        'Faculty members presenting at international conferences.',
        'Research grants awarded for innovative language research.',
      ],
      images: ['/images/research1.jpg', '/images/research2.jpg']
    },
    {
      title: 'Workshops and Seminars',
      color: 'text-red-600',
      borderColor: 'border-red-600',
      description: [
        'Organizing workshops on language development.',
        'Hosting seminars with participation from prominent scholars.',
        'Conducting conferences on innovative teaching methodologies.',
        'Regular training sessions for faculty and students.',
        'Special guest lectures from industry experts.',
      ],
      images: ['/images/workshop1.jpg', '/images/workshop2.jpg']
    },
    {
      title: 'Student Development Programs',
      color: 'text-purple-600',
      borderColor: 'border-purple-600',
      description: [
        'Launching programs for enhancing communication skills.',
        'Workshops on presentation skills and public speaking.',
        'Mentoring programs for underperforming students.',
        'Annual student development conferences.',
      ],
      images: ['/images/studentdev1.jpg', '/images/studentdev2.jpg']
    },
    {
      title: 'Community Outreach',
      color: 'text-yellow-600',
      borderColor: 'border-yellow-600',
      description: [
        'Promoting literacy in underprivileged areas.',
        'Collaborative projects with local schools.',
        'Language learning initiatives for adults.',
        'Organizing cultural exchange programs.',
      ],
      images: ['/images/outreach1.jpg', '/images/outreach2.jpg']
    },
    {
      title: 'Student Projects and Research',
      color: 'text-indigo-600',
      borderColor: 'border-indigo-600',
      description: [
        'Encouraging participation in research projects.',
        'Providing opportunities for publishing student research.',
        'Mentorship programs for student-led initiatives.',
        'Annual research competitions and exhibitions.',
        'Support for interdisciplinary projects.',
      ],
      images: ['/images/projects1.jpg', '/images/projects2.jpg']
    },
  ];

  // Toggle gallery visibility
  const toggleGallery = (index) => {
    setVisibleGallery(visibleGallery === index ? null : index);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Achievements of the English Department</h1>
      <hr className="border-t-2 border-gray-800 w-1/2 mx-auto mb-6" />

      {/* Container for achievement cards with a single column layout */}
      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            {/* Dynamic heading color */}
            <h2 className={`text-2xl font-semibold mb-2 ${achievement.color}`}>{achievement.title}</h2>
            {/* Horizontal line with dynamic color */}
            <hr className={`border-t-2 mb-4 ${achievement.borderColor}`} />
            {/* Achievement points */}
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              {achievement.description.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
            <button
              onClick={() => toggleGallery(index)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Gallery
            </button>

            {/* Display gallery when button is clicked */}
            {visibleGallery === index && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {achievement.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${achievement.title} ${imgIndex + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
