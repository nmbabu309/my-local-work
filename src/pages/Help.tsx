import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, Briefcase, Users, Shield } from 'lucide-react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('workers');

  const workerFAQs = [
    {
      question: "How do I find jobs near me?",
      answer: "Go to the Jobs page and use the search and filter options to find jobs by location, category, and wage range. You can also see recommended jobs on your dashboard based on your skills."
    },
    {
      question: "How do I apply for a job?",
      answer: "Click on any job listing to view details, then click the 'Apply Now' button. Your application will be sent to the employer immediately."
    },
    {
      question: "How can I increase my chances of getting hired?",
      answer: "Complete your profile with all details, add your skills, upload a clear profile picture, and maintain a good rating by delivering quality work."
    },
    {
      question: "How does the rating system work?",
      answer: "After completing a job, employers can rate your work from 1-5 stars. Your average rating is displayed on your profile and helps you get more job opportunities."
    },
    {
      question: "Can I save jobs to apply later?",
      answer: "Yes! Click the heart icon on any job to save it to your Favorites. You can access saved jobs anytime from the Favorites page."
    }
  ];

  const employerFAQs = [
    {
      question: "How do I post a job?",
      answer: "Go to your Dashboard and click 'Post New Job'. Fill in the job details including title, description, category, location, wage, and duration. Your job will be visible to workers immediately."
    },
    {
      question: "How do I review applications?",
      answer: "On your Dashboard, you'll see all applications for your jobs. Click on any application to view the worker's profile and decide to accept or reject."
    },
    {
      question: "Can I edit or delete a job posting?",
      answer: "Yes, you can manage your job postings from your Dashboard. Click on any job to edit details or close the posting."
    },
    {
      question: "How do I contact workers?",
      answer: "Once a worker applies, you can send them a message through the Messages page to discuss job details."
    },
    {
      question: "How does worker rating work?",
      answer: "After a job is completed, you can rate the worker's performance from 1-5 stars and leave feedback. This helps other employers make informed decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions and learn how to use BluuJobs effectively
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="workers">
                <Users className="h-4 w-4 mr-2" />
                For Workers
              </TabsTrigger>
              <TabsTrigger value="employers">
                <Briefcase className="h-4 w-4 mr-2" />
                For Employers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions - Workers</CardTitle>
                  <CardDescription>
                    Everything you need to know about finding and applying for jobs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {workerFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`worker-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions - Employers</CardTitle>
                  <CardDescription>
                    Learn how to post jobs and hire the best workers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {employerFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`employer-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">For Workers:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Complete your profile with accurate information</li>
                  <li>Add all your skills and experience</li>
                  <li>Respond quickly to job opportunities</li>
                  <li>Maintain professional communication with employers</li>
                  <li>Deliver quality work to build a good reputation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">For Employers:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Write clear and detailed job descriptions</li>
                  <li>Set fair wages based on the work required</li>
                  <li>Respond to applications promptly</li>
                  <li>Provide feedback to workers after job completion</li>
                  <li>Build long-term relationships with reliable workers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
