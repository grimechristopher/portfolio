import type { Schema, Attribute } from '@strapi/strapi';

export interface ResumeEducation extends Schema.Component {
  collectionName: 'components_resume_educations';
  info: {
    displayName: 'Education';
    icon: 'globe';
    description: '';
  };
  attributes: {
    Degree: Attribute.String;
    School: Attribute.String;
    StartDate: Attribute.Date;
    EndDate: Attribute.Date;
    Gpa: Attribute.Decimal;
    Bullets: Attribute.Component<'resume.experience-bullet', true>;
    Graduated: Attribute.Boolean;
  };
}

export interface ResumeExperienceBullet extends Schema.Component {
  collectionName: 'components_resume_experience_bullets';
  info: {
    displayName: 'Bullets';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    Text: Attribute.Text;
  };
}

export interface ResumeExperience extends Schema.Component {
  collectionName: 'components_resume_experiences';
  info: {
    displayName: 'Experience';
    icon: 'feather';
    description: '';
  };
  attributes: {
    Position: Attribute.String;
    Company: Attribute.String;
    StartDate: Attribute.Date;
    EndDate: Attribute.Date;
    Bullets: Attribute.Component<'resume.experience-bullet', true>;
    EmploymentType: Attribute.Enumeration<
      ['Full-Time', 'Volunteer', 'Freelance', 'Contract', 'Part-Time']
    >;
    Location: Attribute.String;
  };
}

export interface ResumePublications extends Schema.Component {
  collectionName: 'components_resume_publications';
  info: {
    displayName: 'Publication';
    icon: 'book';
    description: '';
  };
  attributes: {
    Citation: Attribute.String;
  };
}

export interface ResumeSkills extends Schema.Component {
  collectionName: 'components_resume_skills';
  info: {
    displayName: 'Skills';
    icon: 'cube';
  };
  attributes: {
    Skill: Attribute.String;
  };
}

export interface SharedCardBullet extends Schema.Component {
  collectionName: 'components_shared_card_bullets';
  info: {
    displayName: 'CardBullet';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Location: Attribute.String;
    StartDate: Attribute.Date;
    FontAwesomeIconClass: Attribute.String;
    ShowDate: Attribute.Boolean;
  };
}

export interface SharedLink extends Schema.Component {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'oneToOne';
    description: '';
  };
  attributes: {
    Text: Attribute.String;
    Url: Attribute.String;
    FontAwesomeIconClass: Attribute.String;
  };
}

export interface SharedTechnologies extends Schema.Component {
  collectionName: 'components_shared_technologies';
  info: {
    displayName: 'Technologies';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Color: Attribute.String;
    Svg: Attribute.Text;
    Viewbox: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'resume.education': ResumeEducation;
      'resume.experience-bullet': ResumeExperienceBullet;
      'resume.experience': ResumeExperience;
      'resume.publications': ResumePublications;
      'resume.skills': ResumeSkills;
      'shared.card-bullet': SharedCardBullet;
      'shared.link': SharedLink;
      'shared.technologies': SharedTechnologies;
    }
  }
}
