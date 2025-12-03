
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Briefcase, Heart, Sprout, PiggyBank, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t('about.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.intro')}
          </p>
        </div>
      </div>
      
      {/* Mission Section */}
      <section className="py-6 md:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('about.mission.title')}
            </span>
            <h2 className="mt-3 text-3xl font-bold">{t('about.mission.subtitle')}</h2>
          </div>
          
          <p className="text-gray-700 mb-6 text-justify">
            {t('about.mission.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.goals.agricultural.title')}</h3>
                  <p className="text-gray-600 text-justify">
                    {t('about.goals.agricultural.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.goals.livestock.title')}</h3>
                  <p className="text-gray-600 text-justify">
                    {t('about.goals.livestock.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.goals.empowerment.title')}</h3>
                  <p className="text-gray-600 text-justify">
                    {t('about.goals.empowerment.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.goals.advancement.title')}</h3>
                  <p className="text-gray-600 text-justify">
                    {t('about.goals.advancement.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* History Timeline */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('about.journey.title')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">{t('about.journey.subtitle')}</h2>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200"></div>
            
            {/* Timeline items */}
            <div className="relative z-10">
              {/* Timeline item 1 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">{t('about.journey.registration.title')}</h3>
                    <p className="text-sm text-gray-500 mb-2">1st Kartik 2058</p>
                    <p className="text-gray-700">
                      {t('about.journey.registration.description')}
                    </p>
                  </div>
                </div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
              
              {/* Timeline item 2 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">{t('about.journey.early.title')}</h3>
                    <p className="text-sm text-gray-500 mb-2">2058-2064</p>
                    <p className="text-gray-700">
                      {t('about.journey.early.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 3 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">{t('about.journey.expansion.title')}</h3>
                    <p className="text-sm text-gray-500 mb-2">2064</p>
                    <p className="text-gray-700">
                      {t('about.journey.expansion.description')}
                    </p>
                  </div>
                </div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
              
              {/* Timeline item 4 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">{t('about.journey.growth.title')}</h3>
                    <p className="text-sm text-gray-500 mb-2">2072</p>
                    <p className="text-gray-700">
                      {t('about.journey.growth.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">{t('about.journey.reach.title')}</h3>
                    <p className="text-sm text-gray-500 mb-2">2077 - Present</p>
                    <p className="text-gray-700">
                      {t('about.journey.reach.description')}
                    </p>
                    <p className="mt-2 font-medium text-green-800">
                      {t('about.journey.today')}
                    </p>
                  </div>
                </div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('about.values.title')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">{t('about.values.subtitle')}</h2>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('about.values.community.title')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('about.values.community.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('about.values.inclusion.title')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('about.values.inclusion.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <Sprout className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('about.values.sustainability.title')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('about.values.sustainability.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('about.values.service.title')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('about.values.service.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('about.cta.title')}
          </h2>
          
          <p className="text-green-100 text-justify">
            {t('about.cta.description')}
          </p>
          
          <div className="pt-4">
            <Link 
              to="/members" 
              className="bg-white text-green-700 px-6 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 font-medium inline-block"
            >
              {t('about.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
