import React from 'react';
import './CompetitiveEnglish.css'; // Ensure the CSS file is in the same directory or adjust the path accordingly.

const CompetitiveEnglish = () => {
  return (
    <div className="competitive-english-page">
      <h1 className="page-title">Competitive English</h1>

      <section className="grammar-section">
        <h2>Grammar Essentials</h2>
        <p>
          Mastering grammar is essential for competitive exams. It includes understanding sentence structure, parts of speech, tenses, voice (active/passive), narration (direct/indirect speech), subject-verb agreement, articles, prepositions, conjunctions, and other aspects of English grammar.
        </p>
        <ul>
          <li>Parts of Speech: Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, Interjections</li>
          <li>Tenses: Present, Past, Future (Simple, Continuous, Perfect, Perfect Continuous)</li>
          <li>Subject-Verb Agreement</li>
          <li>Active and Passive Voice</li>
          <li>Direct and Indirect Speech</li>
          <li>Articles and Determiners</li>
          <li>Modals and Conditionals</li>
          <li>Prepositions and Conjunctions</li>
        </ul>
      </section>

      <section className="exam-syllabus-section">
        <h2>GRE Exam Syllabus</h2>
        <p>
          The GRE (Graduate Record Examination) is a standardized test required for admission to many graduate schools. The Verbal Reasoning section assesses your ability to analyze and evaluate written material, synthesize information obtained from it, and understand the meanings of words, sentences, and entire texts.
        </p>
        <h3>Verbal Reasoning Syllabus</h3>
        <ul>
          <li>Reading Comprehension</li>
          <li>Text Completion</li>
          <li>Sentence Equivalence</li>
          <li>Critical Reasoning</li>
          <li>Vocabulary</li>
        </ul>
      </section>

      <section className="exam-syllabus-section">
        <h2>TOEFL Exam Syllabus</h2>
        <p>
          The TOEFL (Test of English as a Foreign Language) measures the English language ability of non-native speakers wishing to enroll in English-speaking universities. The test evaluates the proficiency in reading, writing, speaking, and listening.
        </p>
        <h3>Reading Section Syllabus</h3>
        <ul>
          <li>Understanding academic texts</li>
          <li>Analyzing main ideas and details</li>
          <li>Identifying the purpose of the passage</li>
        </ul>
        <h3>Listening Section Syllabus</h3>
        <ul>
          <li>Understanding conversations and lectures</li>
          <li>Inferring speaker's attitude or purpose</li>
          <li>Identifying the main points and supporting details</li>
        </ul>
        <h3>Speaking Section Syllabus</h3>
        <ul>
          <li>Independent speaking tasks</li>
          <li>Integrated speaking tasks</li>
        </ul>
        <h3>Writing Section Syllabus</h3>
        <ul>
          <li>Independent writing tasks</li>
          <li>Integrated writing tasks</li>
        </ul>
      </section>
    </div>
  );
};

export default CompetitiveEnglish;
