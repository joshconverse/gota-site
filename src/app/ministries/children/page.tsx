import Image from 'next/image';
import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import { KID_TEEN_HERO_IMAGES } from '@/lib/heroImages';

export default function ChildrensMinistryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={KID_TEEN_HERO_IMAGES}
            alt="Grace Kids background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="sr-only">Grace Kids</h1>
              <Image
                src="/grace-kids-logo.png"
                alt="Grace Kids"
                width={900}
                height={738}
                priority
                className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto mb-6 drop-shadow-lg"
              />
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                We provide a safe, loving, Christ-centered environment for babies through 5th grade and help them learn about Jesus.
              </p>
              <Link
                href="/ministries"
                className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
              >
                Back to Ministries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Grace Kids */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              About Grace Kids
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Our primary goals are to support parents in their role of raising godly children and to help children understand and apply the gospel in their lives. Each week our volunteers prepare a gospel-centered lesson and activity. We sing songs of worship, engage with age-appropriate Bible curriculum, and create a warm environment where kids can grow in faith alongside friends.
              </p>
              <p>
                We truly believe that a child&apos;s spiritual journey is best led by their parents. No church program can replace a parent&apos;s influence &mdash; Grace Kids is here to come alongside you, provide resources, and create an environment that supports your family&apos;s spiritual growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Time? Check-In */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8 text-center">
              First Time? Here&apos;s How Check-In Works
            </h2>
            <ol className="space-y-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-1 text-white flex items-center justify-center font-semibold">1</span>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-1">Head to the Kids&apos; Check-In Desk</h3>
                  <p className="text-gray-700 leading-relaxed">Located on the right side of the Welcome Center.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-1 text-white flex items-center justify-center font-semibold">2</span>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-1">Meet a Grace Kids volunteer</h3>
                  <p className="text-gray-700 leading-relaxed">They&apos;ll help you get checked in and answer any questions.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-1 text-white flex items-center justify-center font-semibold">3</span>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-1">Receive your security stickers</h3>
                  <p className="text-gray-700 leading-relaxed">Both you and your child will receive a matching sticker. You&apos;ll also have a chance to note any medical needs or special instructions.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-1 text-white flex items-center justify-center font-semibold">4</span>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-1">After the service</h3>
                  <p className="text-gray-700 leading-relaxed">Show your security sticker to your child&apos;s teacher to pick up your child.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Ages Served & Departments */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            Ages Served &amp; Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-2">Preschool</h3>
              <p className="text-sm font-semibold text-brand-1 mb-4">Babies through Kindergarten</p>
              <p className="text-gray-700 leading-relaxed">
                Our preschool department introduces our youngest children to God&apos;s love and the life and ministry of Jesus. Each session includes a short lesson, songs, a missionary story, snack time, and play with friends.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-2">Elementary</h3>
              <p className="text-sm font-semibold text-brand-1 mb-4">1st through 4th Grade</p>
              <p className="text-gray-700 leading-relaxed">
                Children&apos;s Church is a time of worship and Bible study designed for 1st through 4th graders. Biblical truths are presented through dynamic, age-appropriate activities that help each child recognize and develop the gifts God has given them.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-2">5th Grade</h3>
              <p className="text-sm font-semibold text-brand-1 mb-4">Worshiping with the congregation</p>
              <p className="text-gray-700 leading-relaxed">
                5th graders are encouraged to worship with their parents in the sanctuary at 10:45am. To help them engage, they can pick up a 5th Grade Worship Notes sheet from the Welcome Center desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When We Meet */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            When We Meet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-4 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">Sundays</h3>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  <span className="font-semibold text-black">9:30 am</span> &mdash; Sunday Classes<br />
                  Babies through 5K
                </li>
                <li>
                  <span className="font-semibold text-black">10:45 am</span> &mdash; During the Worship Service<br />
                  Babies through 5K | Children&apos;s Church (1st&ndash;4th Grade)
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                On the 5th Sunday of each month, 1st&ndash;4th graders worship with their families in the sanctuary.
              </p>
            </div>
            <div className="bg-brand-4 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">Wednesdays</h3>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  <span className="font-semibold text-black">5:30 pm</span> &mdash; Dinner
                </li>
                <li>
                  <span className="font-semibold text-black">6:30 pm</span> &mdash; Grace Kids Programming
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grace Kids Wednesday Night Discipleship */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              Grace Kids &mdash; Wednesday Night Discipleship
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Grace Kids is our Wednesday night discipleship program. Each week includes:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg text-gray-700">
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Bible verse memorization</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Biblical truth through engaging activities</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Missionary stories from around the world</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Worship music</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Interactive games</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            Curriculum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-4 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-2">Sundays &mdash; Gospel Project</h3>
              <p className="text-gray-700 leading-relaxed">
                A chronological, Christ-centered curriculum that walks children through the entire Bible during their time in our ministry.
              </p>
            </div>
            <div className="bg-brand-4 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-2">Wednesdays &mdash; Answers in Genesis</h3>
              <p className="text-gray-700 leading-relaxed">
                A biblically grounded curriculum that helps children understand Scripture in light of science and the world around them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              Safety &amp; Security
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Your child&apos;s safety is our highest priority. We have multiple layers of protection in place:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Secure child check-in system with matching parent/child labels</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Background checks and reference verification for all employees and volunteers</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Trained Safety Team members prepared to respond to emergencies</li>
              <li className="flex items-start"><span className="text-brand-1 mr-2">&bull;</span>Camera surveillance throughout the children&apos;s building</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Questions?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Reach out to our Grace Kids team &mdash; we&apos;d love to help you and your family get connected.
            </p>
            <a
              href="mailto:children@gotachurch.org"
              className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              children@gotachurch.org
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
