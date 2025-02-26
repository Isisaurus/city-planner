# About the project

This project contains an idea for a web-based platform to enhance transparency and community engagement in city planning.

## The vision

_Transparency and Engagement_

Make city planning transparent, accessible, and interactive.

_Community Involvement_

Allow citizens to contribute ideas, vote on projects, and actively participate in their city’s development.

_Inclusive Communication_

Keep the community informed about project timelines, updates, and changes.

## User stories

Users

- Can browse city projects, timelines, and updates;
- Can view community discussions and votes (read-only);
- Can apply for a city card (registration required);

Verified users

- Can vote and comment on project ideas;
- Can submit their own project ideas and track their status;
- Receive notifications about updates on their submitted ideas or projects they are following;

Administrators (City Planners/Officials)

- Can review, approve, or reject submitted ideas;
- Can post official city projects with detailed descriptions;
- Can create project timelines and update statuses;
- Can reply to community comments and questions;

## Core features

1. User Authentication and Verification

- Google OAuth for easy sign-up and sign-in;
- City Card verification process to unlock voting, commenting, and idea submission features;
- Admin dashboard for user management and city card verification;

2. Project Management

- Project Listings: Detailed descriptions, objectives, location maps, and visual mockups;
- Timeline and Milestones: Dynamic timelines showing project stages (e.g., Planning, Approval, Construction, Completion);
- Status Updates: Real-time updates on project progress;
- Voting System: Allowing verified users to upvote or downvote ideas and projects;
- Comments and Discussions: Users can comment on projects, ask questions, and engage in community discussions;
- Advanced Search and Filtering:
  - Users can search by project title or keywords;
  - Filter options include:
    - Project Category: Infrastructure, Community Events, Public Spaces Environmental Projects, etc.
    - Status: Planning, Approved, Under Construction, Completed.
    - Location: Neighborhoods or districts within the city.
    - Timeline: Ongoing projects, Upcoming projects, or Completed projects within a specific date range.
  - Sort By: Popularity, Newest, or Near Completion.

3. Idea Submission and Tracking:

- Submit Ideas: Verified users can submit ideas with descriptions, objectives, and location suggestions;
- Idea Status Tracking: Users can track the status of their ideas (e.g., Submitted, Under Review, Approved, Rejected, In Progress);
- Admin Feedback: Administrators can provide feedback, ask for clarifications, or give reasons for rejection;

4. City Card Registration and Verification:

- City Card Application: Users can apply for a city card by entering their address and uploading proof of residence;
- Digital City Card: Once verified, users receive a digital city card that they can use to get discounts on services and events in the city;

5. Notifications and Updates:

- Email and in-app notifications for:
  - Project updates or milestone completions;
  - Status changes on submitted ideas;
  - Replies to comments or community discussions;
  - Approval or rejection of City Card applications;

6. Administrative Dashboard:

- Review and moderate submitted ideas and comments;
- Post official city projects and updates;
- Create and edit project timelines;

# Installation

After cloning, install the repository by running:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

To auto-format your code upon change using prettier, run:

```bash
npm run prettier-watch
```

# Resources

- Used [Flowbite](https://flowbite.com/) for quick prototyping;
- [Auth.js](https://authjs.dev/getting-started/installation?framework=next-js) for the heavy lifting on authentication and session management;
- [Sanity](https://www.sanity.io/) as data serving and management;
