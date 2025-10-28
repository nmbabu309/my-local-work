import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing and using BluuJobs, you accept and agree to be bound by the terms and 
                      provisions of this agreement. If you do not agree to these terms, please do not use 
                      this service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
                    <p className="text-muted-foreground mb-2">
                      To use certain features of BluuJobs, you must register for an account. When you 
                      register, you agree to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Provide accurate and complete information</li>
                      <li>Keep your password secure</li>
                      <li>Notify us of any unauthorized use of your account</li>
                      <li>Be responsible for all activities under your account</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">3. User Conduct</h2>
                    <p className="text-muted-foreground mb-2">You agree not to:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Post false or misleading information</li>
                      <li>Use the service for any illegal purpose</li>
                      <li>Harass, abuse, or harm other users</li>
                      <li>Spam or send unsolicited messages</li>
                      <li>Attempt to gain unauthorized access to the service</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">4. Job Postings</h2>
                    <p className="text-muted-foreground">
                      Employers are responsible for the accuracy and legality of their job postings. 
                      BluuJobs reserves the right to remove any job posting that violates these terms 
                      or applicable laws.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">5. Payments and Wages</h2>
                    <p className="text-muted-foreground">
                      All payment arrangements are made directly between employers and workers. BluuJobs 
                      is not responsible for payment disputes or non-payment issues. Users should agree 
                      on payment terms before starting work.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">6. Ratings and Reviews</h2>
                    <p className="text-muted-foreground">
                      Users may rate and review each other after job completion. Reviews must be honest 
                      and based on actual experiences. We reserve the right to remove reviews that violate 
                      our guidelines.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">7. Privacy</h2>
                    <p className="text-muted-foreground">
                      Your use of BluuJobs is also governed by our Privacy Policy. Please review our 
                      Privacy Policy to understand our practices regarding your personal information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                      BluuJobs provides this platform "as is" without any warranties. We are not liable 
                      for any damages arising from your use of the service, including but not limited to 
                      job disputes, payment issues, or personal injury.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to terminate or suspend your account at any time for violations 
                      of these terms or for any other reason at our discretion.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
                    <p className="text-muted-foreground">
                      We may update these terms from time to time. Continued use of the service after 
                      changes constitutes acceptance of the new terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
                    <p className="text-muted-foreground">
                      If you have questions about these terms, please contact us at legal@bluujobs.com
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
