
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, FileText, CreditCard, Award, Vote, Store } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Members = () => {
  const { t } = useTranslation();

  const memberBenefits = [
    {
      icon: <CreditCard className="h-6 w-6 text-green-600" />,
      title: t('members.benefits.items.loans.title'),
      description: t('members.benefits.items.loans.description')
    },
    {
      icon: <Award className="h-6 w-6 text-green-600" />,
      title: t('members.benefits.items.savings.title'),
      description: t('members.benefits.items.savings.description')
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: t('members.benefits.items.agricultural.title'),
      description: t('members.benefits.items.agricultural.description')
    },
    {
      icon: <Award className="h-6 w-6 text-green-600" />,
      title: t('members.benefits.items.dividends.title'),
      description: t('members.benefits.items.dividends.description')
    },
    {
      icon: <Vote className="h-6 w-6 text-green-600" />,
      title: t('members.benefits.items.participation.title'),
      description: t('members.benefits.items.participation.description')
    },
    {
      icon: <Store className="h-6 w-6 text-green-600" />,
      title: t('members.benefits.items.store.title'),
      description: t('members.benefits.items.store.description')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t('members.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('members.intro')}
          </p>
        </div>
      </div>
      
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          {/* Member Benefits Section */}
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('members.benefits.title')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">{t('members.benefits.subtitle')}</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {t('members.benefits.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {memberBenefits.map((benefit, index) => (
              <div key={index} className="glass-card p-6 rounded-xl hover-card">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Membership Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* How to Join */}
            <div className="glass-card rounded-xl p-8">
              <div className="text-center mb-8">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700">{t('members.howToJoin.title')}</h2>
                <p className="text-gray-600 mt-2">{t('members.howToJoin.subtitle')}</p>
              </div>
              
              <ol className="space-y-4">
                {(t('members.howToJoin.steps', { returnObjects: true }) as string[]).map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
              
              <div className="mt-8 text-center">
                <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('members.howToJoin.downloadForm')}
                </button>
              </div>
            </div>

            {/* Membership Requirements */}
            <div className="glass-card rounded-xl p-8">
              <div className="text-center mb-8">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700">{t('members.requirements.title')}</h2>
                <p className="text-gray-600 mt-2">{t('members.requirements.subtitle')}</p>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{t('members.requirements.eligibility.title')}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('members.requirements.eligibility.description')}
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{t('members.requirements.financial.title')}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('members.requirements.financial.membershipFee')}<br />
                    {t('members.requirements.financial.shareMinimum')}
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{t('members.requirements.geographic.title')}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('members.requirements.geographic.description')}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  {t('members.requirements.note')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact for Membership */}
          <div className="mt-20 text-center bg-gradient-to-br from-green-50 to-white p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">{t('members.cta.title')}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('members.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button-primary">
                {t('members.cta.findBranch')}
              </button>
              <button className="button-secondary">
                {t('members.cta.contact')}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Members;
