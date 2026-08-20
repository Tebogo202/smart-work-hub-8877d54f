# Smart Work Hub

AI Workplace Productivity Assistant — Complete Project Specification

Build a complete, polished, responsive web application called AI Workplace Productivity Assistant.

The application is a single integrated AI-powered workplace productivity platform designed to help employees and professionals complete common workplace tasks more efficiently.

The application must feel like a real, production-quality SaaS product rather than a basic student prototype.

1. Main Goal

Create ONE integrated dashboard containing four AI-powered productivity tools:

Smart Email Generator

Meeting Notes Summarizer

AI Task Planner

AI Workplace Chatbot

All four tools must be accessible from one consistent dashboard and sidebar navigation.

Do not create separate unrelated applications.

2. Technology and Implementation

Use a modern web application architecture suitable for deployment.

Use:

React

TypeScript

Tailwind CSS

Modern component-based architecture

Responsive design

Clean reusable components

Accessible UI elements

Appropriate icons

Professional SaaS-style interface

If an AI API or backend integration is required, structure the application so that the AI functionality can be connected securely without exposing API keys in frontend code.

Do NOT hardcode API keys or secrets.

If an AI integration cannot be completed automatically, create a clear integration structure and graceful fallback/demo behavior rather than allowing the application to break.

3. Overall UI/UX Design

Create a modern, professional SaaS dashboard.

Design style:

Clean

Minimal

Professional

Modern

Corporate

Easy to navigate

Suitable for a workplace environment

Use a consistent visual design system throughout the application.

The application should have:

Desktop Layout

A fixed or collapsible left sidebar containing:

Logo / application name

Dashboard

Email Generator

Meeting Summarizer

Task Planner

AI Assistant

Settings

The main content area should change depending on the selected feature.

Mobile Layout

The application must be fully responsive.

On smaller screens:

Convert the sidebar into a mobile navigation menu

Ensure forms fit the screen

Make buttons easy to tap

Prevent horizontal scrolling

Ensure generated AI responses remain readable

4. Dashboard

Create a welcoming dashboard homepage.

Header:

AI Workplace Productivity Assistant

Subtitle:

Work smarter. Communicate better. Get more done with AI.

Include a short welcome message.

Display four feature cards:

Smart Email Generator

Icon: email

Description:
"Create professional workplace emails in seconds."

Button:
"Open Email Generator"

Meeting Notes Summarizer

Icon: notes/document

Description:
"Turn long meeting notes into clear summaries and action items."

Button:
"Summarize Notes"

AI Task Planner

Icon: calendar/checklist

Description:
"Prioritize tasks and create an organized work plan."

Button:
"Plan My Tasks"

AI Workplace Assistant

Icon: chatbot/sparkles

Description:
"Ask AI for workplace productivity and communication help."

Button:
"Chat with AI"

Also display a small section called:

Productivity Tips

Show 3 short rotating/static workplace productivity tips.

5. SMART EMAIL GENERATOR

Create a complete email generation interface.

Page title:

Smart Email Generator

Subtitle:

Create clear and professional workplace emails with AI.

Input fields:

Email Purpose

Textarea where the user explains what the email is about.

Placeholder:
"Example: I need to request a meeting with my manager to discuss my project progress."

Recipient

Optional input:
"Example: Manager, HR Manager, Client"

Key Points

Textarea:
"Enter the important information that must be included."

Tone

Dropdown with:

Formal

Friendly

Persuasive

Professional

Apologetic

Length

Dropdown:

Short

Medium

Detailed

Add a primary button:

Generate Email

Show loading state while generating.

Generated result section:

Generated Email

Display:

Subject line

Email body

Provide buttons:

Copy

Regenerate

Edit

Clear

The generated output must be editable.

6. EMAIL AI PROMPT

Use structured prompt engineering for the email generator.

The AI should behave as:

"You are a professional workplace communication assistant."

Instructions:

Understand the user's purpose and key points.

Generate a professional email.

Follow the selected tone.

Follow the requested length.

Do not invent facts, names, dates, commitments or information that the user did not provide.

Use clear and professional language.

Include an appropriate subject line.

Structure the email with an appropriate greeting, body and closing.

Keep the message relevant to the user's request.

Do not include unnecessary explanations outside the email.

If important information is missing, make the output generic rather than inventing information.

7. MEETING NOTES SUMMARIZER

Create a page called:

Meeting Notes Summarizer

Subtitle:

Turn meeting notes into clear, actionable information.

Input:

Large textarea:

"Paste your meeting notes here..."

Add an optional meeting title field.

Primary button:

Summarize Meeting

The AI output must be divided into clearly labelled sections:

Meeting Summary

A concise summary of the meeting.

Key Decisions

Important decisions made during the meeting.

Action Items

List tasks that need to be completed.

Each action item should include, where available:

Task

Responsible person

Deadline

Important Points

Other important information.

Follow-Up

Suggested follow-up actions.

Buttons:

Copy Summary

Regenerate

Edit

Clear

8. MEETING SUMMARIZER AI PROMPT

Use the following behavior:

"You are an AI workplace meeting assistant."

Instructions:

Analyze the meeting notes provided by the user.

Produce a concise and accurate summary.

Identify decisions explicitly stated in the notes.

Extract action items.

Identify responsible people only when explicitly mentioned.

Identify deadlines only when explicitly mentioned.

Never invent missing names, dates, decisions or tasks.

If information is unavailable, state "Not specified."

Organize the response into Summary, Key Decisions, Action Items, Important Points and Follow-Up.

Preserve the meaning of the original notes.

Do not introduce unsupported information.

9. AI TASK PLANNER

Create a page called:

AI Task Planner

Subtitle:

Turn your tasks into an organized and prioritized work plan.

Inputs:

Tasks

Large textarea where users can enter multiple tasks.

Example:

"Finish monthly report
Reply to client emails
Prepare presentation
Attend team meeting
Review project proposal"

Planning Period

Dropdown:

Today

This Week

Available Working Hours

Input:
"Example: 08:00 - 17:00"

Priority Preference

Dropdown:

Balanced

Urgent First

Important First

Button:

Create My Plan

The AI should produce:

Prioritized Tasks

Each task should display:

Task name

Priority

Estimated duration

Suggested order

Suggested Schedule

Create a readable daily schedule using the available working hours.

Productivity Suggestions

Provide short suggestions for completing the plan.

Allow the user to:

Regenerate

Copy

Edit

Clear

Do not invent impossible deadlines or claim that a task will definitely be completed.

10. TASK PLANNER AI PROMPT

Use this behavior:

"You are an AI workplace productivity planner."

Instructions:

Analyze the tasks provided by the user.

Prioritize tasks based on urgency, importance and the user's selected preference.

Do not invent deadlines that were not provided.

Estimate task durations reasonably and clearly label them as estimates.

Respect the user's available working hours.

Avoid scheduling overlapping tasks.

Include reasonable breaks when creating a full-day schedule.

Clearly distinguish user-provided information from AI suggestions.

If insufficient information is available, make reasonable general suggestions without pretending they are confirmed facts.

Produce a practical and achievable schedule.

11. AI WORKPLACE CHATBOT

Create a page called:

AI Workplace Assistant

Subtitle:

Your AI assistant for everyday workplace productivity.

Create a modern chat interface.

The user should be able to:

Enter a question

Send the message

Receive an AI response

Continue the conversation

Include suggested prompts above the chat input:

"Help me write a professional email."

"How can I prioritize my tasks?"

"Help me prepare for a meeting."

"How can I communicate with a difficult customer?"

The assistant should focus on:

Workplace productivity

Professional communication

Meeting preparation

Task organization

General workplace assistance

The assistant should not pretend to be a human employee or manager.

12. CHATBOT AI PROMPT

System behavior:

"You are an AI Workplace Productivity Assistant.

Your purpose is to help users with workplace productivity, organization, professional communication, meeting preparation and general workplace tasks.

Provide clear, practical and professional answers.

Do not invent facts.

If the user asks for information that requires current or verified information and the application does not have access to reliable sources, clearly state the limitation.

Do not provide harmful, discriminatory or inappropriate workplace advice.

Encourage users to verify important information before making significant workplace decisions."

13. RESPONSIBLE AI

Add a visible Responsible AI section in the application.

Display:

Responsible AI Notice

"AI-generated content may contain mistakes or inaccurate information. Always review and verify AI-generated content before using it for important workplace communications, decisions or actions."

Also include a small link or navigation item called:

Responsible AI

Create a page/modal explaining:

AI can make mistakes.

Users should review AI-generated content.

Users should avoid entering confidential, personal or sensitive company information.

AI outputs are suggestions and should not automatically be treated as verified facts.

Users remain responsible for decisions made using AI-generated content.

14. ERROR HANDLING

The application must never show a broken or blank screen when an AI request fails.

If generation fails, display a friendly message:

"Something went wrong while generating your response. Please try again."

Include a Try Again button.

Validate required fields before sending requests.

Show helpful validation messages such as:

"Please enter your meeting notes before summarizing."

Prevent empty submissions.

15. LOADING STATES

Whenever AI is generating content:

Show a professional loading state such as:

"AI is thinking..."

Use an animated spinner or subtle loading animation.

Disable the Generate button while processing to prevent duplicate requests.

16. OUTPUT QUALITY

AI responses must be displayed in clean cards or panels.

Use:

Headings

Bullet points

Numbered lists

Appropriate spacing

Readable typography

Do not display raw JSON to the user.

Do not expose system prompts or API keys.

17. COPY FUNCTION

Every major AI-generated output should have a working Copy button.

When copied successfully, show:

"Copied to clipboard!"

18. EDITABLE OUTPUT

Users must be able to edit generated content before copying or using it.

Use a textarea or suitable editable component.

Changes made by the user must not be overwritten unless they explicitly regenerate the content.

19. ACCESSIBILITY

Ensure:

Good text contrast

Keyboard navigation

Clear labels

Accessible buttons

Visible focus states

Descriptive form labels

Responsive typography

20. VISUAL POLISH

Add subtle professional animations such as:

Card hover effects

Smooth transitions

Button hover states

Loading animations

Sidebar transitions

Do not overuse animations.

Use consistent icons throughout the application.

The interface should feel polished and professional.

21. SETTINGS

Create a simple Settings page containing:

Appearance

Light mode

Dark mode

AI Preferences

Default email tone

Default response length

Responsible AI

Link to the Responsible AI information.

22. DATA PRIVACY

Do not store sensitive user information unnecessarily.

Display a reminder near AI input fields:

"Do not enter confidential company information, passwords, financial information or other sensitive personal data."

Do not expose API credentials in frontend code.

23. EMPTY STATES

Each feature should have a helpful empty state before the user enters information.

For example:

"No email generated yet. Enter your email details above and click Generate Email."

Use similar helpful messages for the other tools.

24. NAVIGATION

All sidebar links must work correctly.

The user should be able to move between:

Dashboard
Email Generator
Meeting Summarizer
Task Planner
AI Assistant
Settings
Responsible AI

Do not create dead links or buttons that appear functional but do nothing.

25. FINAL QUALITY REQUIREMENT

Before considering the application complete, check the entire application for:

Broken buttons

Broken navigation

Empty screens

Poor mobile layouts

Missing loading states

Missing error states

Unclear labels

Inconsistent styling

Console errors

AI outputs that are difficult to read

Missing Responsible AI information

Make reasonable improvements automatically rather than stopping after creating only the basic UI.

The final application should look like a professional AI workplace productivity SaaS platform suitable for a portfolio project and academic assessment.

Prioritize functionality, usability, prompt engineering, responsible AI and professional UI/UX.

Build the complete application in one coherent implementation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/848a392c-7199-4cf8-924c-6cd5064ea315).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
