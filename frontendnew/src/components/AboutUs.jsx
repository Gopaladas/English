import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-serif">
      {/* Introduction Paragraph */}
      <div className="flex mb-6 fade-in">
        <div className="border-l-4 border-yellow-900 mr-4"></div>
        <p className="text-lg mb-4">
          The Department of English plays a pivotal role in developing
          communication skills among students to sharpen their capability. In
          addition, an intensive and comprehensive approach is adopted for
          strengthening their language competency. Students are encouraged to do
          projects and also are motivated and trained to contribute to
          newspapers. The department has dedicated and well-qualified staff
          members with expertise to offer various courses like TOEFL, IELTS, and
          GRE. For effective language skills enhancement, language labs are used
          on a regular basis. Foundation courses on communications and soft
          skills are offered in each semester. Students have been motivated to
          participate in department association activities, national and
          international conferences, seminars, guest lectures, workshops, and
          other such activities.
        </p>
      </div>

      {/* Vision of the Department */}
      <div className="flex mb-6 fade-in">
        <div className="border-l-4 border-yellow-900 mr-4"></div>
        <div>
          <h2 className="about text-yellow-900 text-3xl">
            Vision of the Department
          </h2>
          <p className="text-lg mb-4">
            To achieve academic excellence through English Language Competency
            resulting in excellent communication skills and employability skills
            in the students.
          </p>
        </div>
      </div>

      {/* Mission of the Department */}
      <div className="flex mb-6 fade-in">
        <div className="border-l-4 border-yellow-900 mr-4"></div>
        <div>
          <h2 className="about text-yellow-900 text-3xl">Mission</h2>
          <ul className="list-disc list-inside pl-6">
            <li className="mb-2">
              To encourage and insist on the extensive use of English Language
            </li>
            <li className="mb-2">
              To adopt innovative, interactive, and technology-based teaching
            </li>
            <li className="mb-2">
              To assist in the preparation for placement and career development
              exams
            </li>
          </ul>
        </div>
      </div>

      {/* Awards Section */}
      <div className="flex mb-6 fade-in">
        <div className="border-l-4 border-yellow-900 mr-4"></div>
        <div>
          <h2 className="about text-yellow-900 text-3xl">Awards</h2>
          <ul className="list-disc list-inside pl-6">
            <li className="mb-2">Best Academic Department Award - 2019</li>
            <li className="mb-2">Outstanding Faculty Recognition - 2020</li>
            <li className="mb-2">Excellence in Student Development - 2021</li>
          </ul>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="flex mb-6 fade-in">
        <div className="border-l-4 border-yellow-900 mr-4"></div>
        <div>
          <h2 className="about text-yellow-900 text-3xl">Rewards</h2>
          <ul className="list-disc list-inside pl-6">
            <li className="mb-2">
              Top-performing students receive scholarships and certificates of
              merit.
            </li>
            <li className="mb-2">
              Students are encouraged to publish their research in reputed
              journals.
            </li>
            <li className="mb-2">
              Opportunities for participation in international student exchange
              programs.
            </li>
          </ul>
        </div>
      </div>

      {/* Year of Establishment */}
      <div className="flex fade-in">
        <div className="border-l-4 border-yellow-900 mr-4"></div>
        <div>
          <h2 className="about text-yellow-900 text-3xl">
            Year Of Establishment
          </h2>
          <p className="text-lg">Year 2008</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
