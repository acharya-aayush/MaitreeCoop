# MaitreeCoop

A modern, multilingual cooperative management system built for Maitree Savings and Credit Cooperative Ltd.

## Overview

MaitreeCoop is a comprehensive web application designed to serve savings and credit cooperatives with professional member management, content administration, and public-facing information display. The platform provides both English and Nepali language support with a clean, professional interface suitable for financial institutions.

## Features

### Public Interface
- Multilingual support (English/Nepali)
- Responsive design optimized for all devices
- Dynamic content management through Sanity CMS
- Professional announcement and news system
- Member services information
- Board and staff directory
- Contact management system

### Content Management
- Sanity CMS integration for non-technical content updates
- Multi-language content support
- Image and document management
- Announcement and notice system
- News and event publishing
- Board member and staff management

### Technical Features
- Modern React with TypeScript
- Server-side rendering optimized for performance
- Secure API endpoints for form submissions
- Professional loading states and error handling
- SEO optimized structure

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **CMS**: Sanity.io
- **Deployment**: Vercel
- **Internationalization**: react-i18next

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Sanity account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/acharya-aayush/MaitreeCoop.git
cd MaitreeCoop
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Configure the required environment variables in `.env`

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=your_dataset_name
VITE_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

## Project Structure

```
MaitreeCoop/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and configurations
│   └── hooks/          # Custom React hooks
├── maitreecoop/        # Sanity CMS configuration
├── api/                # Serverless API functions
└── public/             # Static assets
```

## Deployment

The application is configured for deployment on Vercel with automatic deployments from the main branch.

### Manual Deployment
```bash
npm run build
npx vercel --prod
```

## Content Management

Content is managed through Sanity Studio, accessible at your configured Sanity URL. The CMS supports:

- Announcements and notices
- News articles
- Board member profiles
- Staff information
- Service descriptions
- Contact information

## Contributing

**IMPORTANT**: This is proprietary software with restricted access.

### For Authorized Contributors
- Access is limited to authorized developers and Maitree Cooperative IT team
- Contact the repository owner for collaboration permissions
- All contributions must comply with cooperative policies and coding standards

### Development Guidelines
1. Create a feature branch: `git checkout -b feature/description`
2. Follow existing code patterns and documentation standards
3. Test thoroughly before submitting changes
4. Submit pull requests with detailed descriptions

## License and Usage Rights

### Proprietary Software Notice

**This software is proprietary and confidential.**

- **Owner**: Maitree Savings and Credit Cooperative Ltd.
- **Developer**: Aayush Acharya (acharya-aayush)
- **License**: All Rights Reserved

### Usage Restrictions

- **NO FORKING**: This repository may not be forked for independent use
- **NO REDISTRIBUTION**: Code may not be copied, modified, or distributed without explicit written permission
- **NO COMMERCIAL USE**: This software may not be used for commercial purposes outside of Maitree Cooperative
- **COOPERATIVE EXCLUSIVE**: Designed exclusively for Maitree Savings and Credit Cooperative Ltd.

### Intellectual Property

All code, designs, configurations, and documentation in this repository are the exclusive property of Maitree Savings and Credit Cooperative Ltd. Unauthorized use, reproduction, or distribution is strictly prohibited and may result in legal action.

### Access and Collaboration

- Repository access is controlled by the cooperative's IT governance policies
- Collaboration is limited to authorized personnel only
- Third-party access requires formal approval and signed confidentiality agreements

**For licensing inquiries or authorized access requests, contact Maitree Savings and Credit Cooperative Ltd. directly.**

## Support

For technical support or questions, please contact the development team.

---

**Maitree Savings and Credit Cooperative Ltd.**  
Professional Cooperative Management System
