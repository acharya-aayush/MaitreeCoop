import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { client as sanityClient, queries } from "../lib/sanity";

interface Event {
  _id: string;
  title: string;
  titleNepali?: string;
  description: string;
  descriptionNepali?: string;
  eventType: string;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  location: string;
  locationNepali?: string;
  venue?: string;
  expectedAttendees?: number;
  actualAttendees?: number;
  requiresRegistration?: boolean;
  registrationSettings?: {
    registrationUrl?: string;
    registrationDeadline?: string;
    registrationFee?: number;
    maxAttendees?: number;
  };
  attachments?: Array<{
    title: string;
    titleNepali?: string;
    description?: string;
    file: {
      asset: {
        _id: string;
        url: string;
        originalFilename: string;
        size: number;
        mimeType: string;
      };
    };
    fileType: string;
  }>;
  eventStatus: string;
  priority: string;
  isFeatured?: boolean;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  organizer?: string;
}

interface SuccessStory {
  _id: string;
  title: string;
  titleNepali?: string;
  storyType: string;
  featuredImage?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  excerpt: string;
  excerptNepali?: string;
  protagonist: {
    name: string;
    nameNepali?: string;
    role: string;
    roleNepali?: string;
    location: string;
    photo?: {
      asset: {
        _id: string;
        url: string;
      };
    };
    memberSince?: string;
  };
  impact?: {
    beneficiaries?: number;
    financialImpact?: number;
    timeframe?: string;
    keyMetrics?: Array<{
      metric: string;
      metricNepali?: string;
      value: string;
      description?: string;
    }>;
  };
  testimonial?: {
    quote: string;
    quoteNepali?: string;
    author: string;
  };
  storyDate: string;
  publishedDate: string;
  categories?: string[];
  isFeatured?: boolean;
}

export const Community = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsData, storiesData] = await Promise.all([
          sanityClient.fetch(queries.upcomingEvents),
          sanityClient.fetch(queries.featuredSuccessStories),
        ]);
        
        setUpcomingEvents(eventsData || []);
        setSuccessStories(storiesData || []);
      } catch (error) {
        console.error("Error fetching community data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRegistration = (event: Event) => {
    if (event.registrationSettings?.registrationUrl) {
      window.open(event.registrationSettings.registrationUrl, '_blank');
    } else if (event.contactEmail) {
      window.location.href = `mailto:${event.contactEmail}?subject=Registration for ${event.title}`;
    }
  };

  const handleDownloadAttachment = (attachment: Event['attachments'][0]) => {
    window.open(attachment.file.asset.url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#2c5aa0]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-[#1a365d] to-[#2c5aa0] text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Vibrant Community
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Join our thriving cooperative community where members come together to achieve shared goals and create lasting positive impact.
            </p>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-2">
                  2,500+
                </div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-2">
                  {upcomingEvents.length}+
                </div>
                <div className="text-gray-600">Upcoming Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-2">
                  {successStories.length}+
                </div>
                <div className="text-gray-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-2">
                  95%
                </div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1a365d]">
              Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="text-sm text-[#2c5aa0] font-semibold mb-2">
                        {formatDate(event.eventDate)}
                        {event.startTime && ` • ${formatTime(event.startTime)}`}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {event.description}
                      </p>
                      <div className="flex items-center text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.venue ? `${event.venue}, ${event.location}` : event.location}
                      </div>
                      
                      {/* Event Type and Priority */}
                      <div className="flex gap-2 mb-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          event.eventType === 'meeting' ? 'bg-blue-100 text-blue-800' :
                          event.eventType === 'workshop' ? 'bg-green-100 text-green-800' :
                          event.eventType === 'conference' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.eventType}
                        </span>
                        {event.priority === 'high' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            High Priority
                          </span>
                        )}
                        {event.isFeatured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Attachments */}
                      {event.attachments && event.attachments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Downloads:</h4>
                          {event.attachments.map((attachment, index) => (
                            <button
                              key={index}
                              onClick={() => handleDownloadAttachment(attachment)}
                              className="text-[#2c5aa0] hover:text-[#1a365d] text-sm flex items-center gap-1 mb-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {attachment.title}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Registration Info */}
                      {event.requiresRegistration && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-700">
                            <div className="font-semibold">Registration Required</div>
                            {event.registrationSettings?.registrationDeadline && (
                              <div>Deadline: {formatDate(event.registrationSettings.registrationDeadline)}</div>
                            )}
                            {event.registrationSettings?.registrationFee && (
                              <div>Fee: NPR {event.registrationSettings.registrationFee}</div>
                            )}
                            {event.registrationSettings?.maxAttendees && (
                              <div>Max Attendees: {event.registrationSettings.maxAttendees}</div>
                            )}
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => handleRegistration(event)}
                        className="bg-[#2c5aa0] text-white px-4 py-2 rounded-lg hover:bg-[#1a365d] transition-colors"
                      >
                        {event.requiresRegistration ? 'Register Now' : 'More Info'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg">No upcoming events at the moment.</p>
                <p>Check back soon for new events!</p>
              </div>
            )}
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1a365d]">
              Success Stories
            </h2>
            {successStories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {successStories.map((story) => (
                  <div key={story._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {story.featuredImage && (
                      <img
                        src={story.featuredImage.asset.url}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          story.storyType === 'business' ? 'bg-blue-100 text-blue-800' :
                          story.storyType === 'education' ? 'bg-green-100 text-green-800' :
                          story.storyType === 'agriculture' ? 'bg-yellow-100 text-yellow-800' :
                          story.storyType === 'community' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {story.storyType}
                        </span>
                        {story.isFeatured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">
                        {story.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {story.excerpt}
                      </p>

                      {/* Impact Metrics */}
                      {story.impact && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-700">
                            {story.impact.beneficiaries && (
                              <div>Beneficiaries: {story.impact.beneficiaries}</div>
                            )}
                            {story.impact.financialImpact && (
                              <div>Financial Impact: NPR {story.impact.financialImpact.toLocaleString()}</div>
                            )}
                            {story.impact.timeframe && (
                              <div>Timeframe: {story.impact.timeframe}</div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Protagonist Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>
                          <div className="font-semibold text-gray-700">{story.protagonist.name}</div>
                          <div>{story.protagonist.role}</div>
                        </div>
                        <div className="text-right">
                          <div>{story.protagonist.location}</div>
                          {story.protagonist.memberSince && (
                            <div>Member since {new Date(story.protagonist.memberSince).getFullYear()}</div>
                          )}
                        </div>
                      </div>

                      {/* Testimonial */}
                      {story.testimonial && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg italic text-sm text-gray-600">
                          "{story.testimonial.quote}"
                          <div className="text-right mt-2 font-semibold">
                            - {story.testimonial.author}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg">No success stories available at the moment.</p>
                <p>Check back soon for inspiring stories!</p>
              </div>
            )}
            
            <div className="text-center mt-8">
              <button className="bg-[#2c5aa0] text-white px-8 py-3 rounded-lg hover:bg-[#1a365d] transition-colors">
                View All Stories
              </button>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-[#1a365d]">
                Community Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#2c5aa0]">
                    Our Values
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Mutual respect and understanding
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Collaborative decision making
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Transparency in all operations
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Commitment to community welfare
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#2c5aa0]">
                    Member Responsibilities
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Active participation in meetings
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Timely payment of shares and fees
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Support fellow members' initiatives
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2c5aa0] mr-2">•</span>
                      Promote cooperative principles
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-12 bg-gradient-to-r from-[#1a365d] to-[#2c5aa0] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Become a member today and be part of a community that's making a real difference in people's lives.
            </p>
            <button className="bg-white text-[#1a365d] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Become a Member
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Community;