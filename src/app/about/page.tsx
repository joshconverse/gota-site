"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? [] : [index]
    );
  };

  const beliefsItems = [
    {
      title: "The Trinity",
      description: "We believe that there is one true, good, and living God who is of one substance, power, and eternal purpose yet eternally existing in three persons: God the Father, God the Son, and God the Holy Spirit. We believe that the Trinity is without division of nature, essence, or being (I John 5:7; Matthew 3:16-17; II Corinthians 13:14). The Father is of none, neither begotten, nor proceeding; the Son is eternally begotten of the Father; and the Holy Spirit eternally proceeding from the Father and the Son (John 15:26; Galatians 4:6). The persons of the Trinity are equal in every divine perfection. They execute distinct but harmonious functions in the work of creation, history, providence, and redemption. God the Trinity possesses all life, glory, goodness, and blessedness in and of Himself. Genesis 1:1,26; John 1:1,3; 4:24; 5:26; Matthew 28:19; Acts 7:2; Romans 1:19,20; 9:5; Ephesians 4:5,6; Colossians 2:9"
    },
    {
      title: "The Father",
      description: "We believe in God the Father, an everlasting, infinite, perfect personal being who is the sovereign and rightful ruler of all that exists. The Father is perfect in holiness, wisdom, power, and love. God created all things and upholds, directs, disposes, and governs all creatures, actions, and things by His wise and holy providence according to his infallible foreknowledge and the immutable counsel of His own will. God, in His ordinary providence, makes use of all natural and spiritual means yet is free to work without, above, and against them at His pleasure. He does this to the praise of the glory of His wisdom, power, justice, goodness, and grace. He is sufficient in Himself, not standing in need of any creature that He has made. He conducts Himself with steadfast mercy towards humanity. He draws men to Himself through His Son, forgiving the sin and delivering from death those who come to Him through Christ for salvation. The Father hears and answers prayer according to His wisdom, love, and providence. Job 22:2-3; 34:10; Psalm 139; Isaiah 55:10-11; Daniel 3:27; Hosea 1:7; 2:21-22; Luke 10:21-22; Matthew 4:4; 23:9; John 3:16; 6:27; Acts 17:24-28, 31; Colossians 1:16-17; Revelation 1:4-6; Romans 1:7; 4:19-21; I Timothy 1:1,2; 2:5,6; I Peter 1:3"
    },
    {
      title: "The Son",
      description: "We believe in Jesus Christ, God's only begotten eternal Son, very God of very God, and the image of the invisible God. He took upon Himself our nature; being conceived by the Holy Spirit and born of the Virgin Mary and manifested in a body of flesh. He lived a sinless life, performed many signs and wonders, and taught the words of eternal life. He offered Himself as a penal substitutionary atoning sacrifice for sinners. He was physically crucified, suffered, bled, died and was buried. By the blood of His cross, He secured for us eternal redemption and made a way for life everlasting. Matthew 1:18-25; Luke 1:26-38; Romans 9:5; John 1:1-18; 8:46-47; 20:28, 30-31; II Corinthians 5:21; Galatians 3:13; Ephesians 1:7). Salvation is found in and through Christ and Him alone. It is only because of His shed blood that we may approach the throne of grace and receive pardon for our sins from the Father. He was raised from the dead on the third day and appeared to His disciples in His resurrected body. He later ascended into heaven where He now sits at the right hand of the Father and is perpetually interceding for the saints. He awaits the time when the Father will send Him personally back to earth to a final resurrection of His people and judge His creation to usher in the final portion of redemptive history. He is due from angels, men, and every other creature whatever worship, service, or obedience He is pleased to require of them. At His appearing, every knee will bow and every tongue will confess that Jesus is Lord. Acts 1:11; I Corinthians 15:1-28; Hebrews 7:25; 9:28; I Peter 2:21-23; Matthew 20:28; Romans 5:6-8; 6:9, 10; 8:34; I Timothy 3:16; Revelation 5:12-14"
    },
    {
      title: "The Holy Spirit",
      description: "We believe in the Holy Spirit, eternally one with the Father and Son, who convicts and convinces the world of sin, of righteousness, and of judgment (John 16:8). Through illumination He enables men to understand truth. The Holy Spirit is the divine agent by whom believers are born into the Kingdom of God. As our abiding helper, the Spirit effectually calls, sanctifies, empowers, baptizes, indwells, guides, teaches, and equips all believers for service and witness. The indwelling of the Holy Spirit guides, governs, and protects the child of God from spiritual defeat and oppression (Ephesians 6:11-18). He enables believers to live in union with Christ and God the Father. John 14:16,17,26; 15:26-27; John 16:9-14; I Corinthians 12:13; I Corinthians 2:10-11; 3:16; 6:19; II Corinthians 3: 6; Galatians 5:22-26; Titus 3:5; Romans 8:9,12-13; Ephesians 6:11-18"
    },
    {
      title: "Condition of Man and Woman",
      description: "Adam and Eve received a command not to eat of the tree of the knowledge of good and evil which allowed them, while they kept it, to remain joyfully whole in their communion with God and have dominion over the earth and all living things. Adam and Eve, being influenced and seduced by the subtlety and temptation of Satan, sinned in eating of the fruit of the tree of the knowledge of good and evil. They thereby incurred not only physical death but also spiritual death which is separation from God. God permitted their sin, having allowed it to His own ultimate mercy and glory. By this sin they fell from their original righteousness and communion with God and so became dead in sin and wholly corrupted in all their parts and faculties of soul, spirit, and body. As they were the root of all mankind, the guilt, death, and corrupted nature caused by this sin was imputed and conveyed to all their posterity descending from generation to generation. Since this original corruption, we are utterly indisposed, disabled, and made opposite to all good. We are thus wholly inclined to all evil and from this disposition proceeds all actual sin. For this reason, we believe all human beings are born with a sinful nature. This corruption of nature, during this life, remains in those that are saved; and although it is, through Christ, pardoned and mortified, it is never completely overcome until our glorification. Genesis 1:27-28; 2:16-17; 3:6-8, 11,13,23; 5:3; 6:5; 8:21; Job 14:4; 15:4; Psalm 51:5; Ecclesiastes 7:29; Jeremiah 17:9; Matthew 15:19; Acts 17:26; Romans 3:10- 18,23; 5:6,12, 15-19; 7:18; 8:7; 11:32; I Corinthians 15:21-22, 45, 49; II Corinthians 11:3; Ephesians 2:1-3; Colossians 1:21; Titus 1:15; James 1:14-15; 1 John 1:8,10; Romans 7:5,8, 14, 17-18, 23, 25; Galatians 5:17"
    },
    {
      title: "Marriage, Gender and Sexuality",
      description: "The Bible teaches that marriage is a covenant between one man and one woman, in a single exclusive union, by which their status changes from two individuals to one flesh as God joins them together. This covenant creates a new family such that their lifelong primary human loyalty is now to one another before anyone else. It is an earthly covenant between one man and one woman that God created and sanctioned to image the unbreakable heavenly covenant between Christ and His Church, therefore intended not to be broken by anything but death. From Genesis to Revelation, the authority of Scripture witnesses to the nature of biblical marriage as uniquely bound to the complementarity of man and woman. Regarding gender, God fearfully and wonderfully created each person as male or female. These two distinct, complementary genders together reflect the image and nature of God. Regarding sex, God created sex as a gift to be enjoyed within the covenant of marriage. We believe that God has commanded that no intimate sexual activity be engaged in outside of this marriage covenant. We believe that the exercise of sexual expression outside the biblical definition of marriage in any manner is contradictory to God's design for sexuality and marriage. Genesis 1:26-27; Genesis 2:15-25; Psalm 139; Matthew 5:27-32; Matthew 19:3- 12; Romans 1:26-27; 1 Corinthians 6:9-11; 1 Corinthians 6:18; 7:2-5; Ephesians 5:21-33; Hebrews 13:4; 1 Timothy 1:10"
    },
    {
      title: "Salvation",
      description: "Salvation is a mystery. While acknowledging our finite and incomplete understanding of God's ways, in faith we believe that God, by His providence and eternal counsel, chose some persons to life and salvation before the foundation of the world. These He effectually calls to Himself. Whoever He calls, He will justify and keep by His power through faith to salvation (Acts 13:48; Ephesians 1:2-4; 2:4-5, 8-9; II Thessalonians 2:13; 1 Peter1:2). His choice was of Himself, for His own pleasure and glory, and not with regard to, or with reference to, any foreseen works of faith or deeds in the creature as His motive. His choice prevails and triumphs over human resistance to bring His own to saving faith (John 17:6,9,19; 11:51- 52; Ephesians 1:4; Romans 8:32-33; 11:5-6; Titus 3:4-7; Revelation 5:9). Justification occurs by and through Christ and because of His work on the cross and is apprehended through faith. No man is justified in the sight of God partly by Christ and partly by works (Romans 3:20,28,30; 8:33; Galatians 5:4). Salvation is the gracious purpose of God according to which He justifies, sanctifies, and glorifies sinners. It is the glorious display of God's sovereign goodness and grace, and is infinitely wise, holy, and unchangeable. It precludes boasting and encourages humility. The grace of redemption is that by which God effectually calls His chosen, converting them to Himself, and quickening them from spiritual death to spiritual life. This grace is operative by and through God alone, not in cooperation with man, meaning that those who are redeemed always come to saving faith, as they are made willing to come to Christ by the drawing of God, and receive through faith their redemption and eternal salvation. Matthew 22:14; John 6:44; 14:6; Romans 8:2,30; 9:11; 11:7; Ephesians 1:4-12, 17-19; 2:1-5; II Thessalonians 2:13-14; II Timothy 1:9-10; Titus 3:4-5; Acts 26:18; I Corinthians 2:10-12; Ezekiel 11:19; 36:26; Philippians 2:13 We further believe that the work of Christ on the cross for sin warrants and impels a universal offering of the gospel to all persons, so that to every person it may be truly said, &apos;God gave his only begotten Son so that whoever believes in Him might not perish but have eternal life.&apos; Those whom God calls will hear His voice and follow Him. Whoever comes by the drawing of God through the invoking of the Holy Spirit Jesus Christ will not cast out. Matthew 28:19; John 3:16; 4:14; 6:37; 10:27; Colossians 1:23; Acts 1:8; Revelation 22:17"
    },
    {
      title: "Baptism and the Lord's Supper",
      description: "Christian baptism is the immersion of a believer in water in the name of the Father, the Son, and the Holy Spirit. It is an act of outward obedience symbolizing the believer's faith in a crucified, buried, and risen Savior; death to sin; burial of the old life; and resurrection to walk in newness of life in Christ Jesus. It is a testimony to a believer's faith in an ultimate bodily resurrection to eternal life with Christ in His Kingdom. The Lord's Supper is an act of worship and obedience whereby believers, through partaking of the bread and the fruit of the vine, memorialize the death of the Redeemer and anticipate His second coming. Baptism and the Lord's Supper are significant expressions of salvation, worship, and submission to God for the believer. Matthew 3:13-17; 26:26-30; 28:19-20; Mark 1:9-11; 14:22-26; Luke 3:21-22; 22:19-20; John 3:23; Acts 2:41-42; 8:35- 39; 16:30-33; 20:7; Romans 6:3-5; 1 Corinthians 10:16, 21; 11:23-29;"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/MATURE2.jpg"
            alt="Community background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  About Us
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Grace on the Ashley is a community of believers dedicated to making, maturing, and multiplying disciples of Jesus.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#beliefs"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Beliefs
                  </Link>
                  <Link
                    href="#leadership"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Our Leadership
                  </Link>
                  <Link
                    href="/visit"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Visit Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="beliefs" className="min-h-screen flex items-center py-24 scroll-mt-24" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <div className="text-center mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Beliefs
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Beliefs FAQ Section */}
              <div className="space-y-6 h-[1800px] overflow-hidden lg:border-r lg:border-gray-300 lg:pr-8">
                {beliefsItems.map((item, index) => (
                  <div key={index} className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-0 py-6 text-left flex justify-between items-center transition-colors group"
                    >
                      <h3 className="text-xl font-light text-black pr-4 transition-colors text-left">
                        {item.title}
                      </h3>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-4 flex items-center justify-center">
                        <svg
                          className={`w-6 h-6 text-brand-1 transition-transform duration-200 ${openItems.includes(index) ? 'rotate-180' : ''}`}
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.5303 20.8839C16.2374 21.1768 15.7626 21.1768 15.4697 20.8839L7.82318 13.2374C7.53029 12.9445 7.53029 12.4697 7.82318 12.1768L8.17674 11.8232C8.46963 11.5303 8.9445 11.5303 9.2374 11.8232L16 18.5858L22.7626 11.8232C23.0555 11.5303 23.5303 11.5303 23.8232 11.8232L24.1768 12.1768C24.4697 12.4697 24.4697 12.9445 24.1768 13.2374L16.5303 20.8839Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${openItems.includes(index) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-0 py-6">
                        <div className="text-gray-600 leading-relaxed text-left">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Basic Beliefs Section */}
              <div>
                <div>
                  <h3 className="text-2xl font-normal text-black mb-6 text-left">Our Basic Beliefs Are:</h3>
                  <ul className="space-y-4 text-gray-700 text-left">
                    <li>• The Bible is God&apos;s written revelation to man and is infallible, authoritative, and all-sufficient.</li>
                    <li>• The Word of God is objective and absolutely inerrant in the original documents.</li>
                    <li>• There is but one living and true God, perfect in all His attributes, one in essence, eternally existing in three Persons—Father, Son, and Holy Spirit.</li>
                    <li>• All men are sinners by nature, by choice, and by divine declaration, thus incurring upon themselves the penalty of spiritual and physical death—becoming subjects to the wrath of God.</li>
                    <li>• Only through faith and repentance in the person and work of Jesus Christ can one be reconciled to God.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24" style={{ backgroundColor: '#96A78D' }}>
        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">

          {/* Elders Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Meet our Elders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-24">
            {/* Greg Smith */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_1.jpg"
                  alt="Greg Smith"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Greg Smith</h3>
              <p className="text-lg text-white/90 mb-4">Elder and Lead Pastor</p>
            </div>

            {/* Kelly Graham */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_14.jpg"
                  alt="Kelly Graham"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Kelly Graham</h3>
              <p className="text-lg text-white/90 mb-4">Elder and Associate Pastor</p>
            </div>

            {/* John Butz */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_4.jpg"
                  alt="John Butz"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">John Butz</h3>
              <p className="text-lg text-white/90 mb-4">Elder</p>
            </div>

            {/* Roger Parker */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_11.jpg"
                  alt="Roger Parker"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Roger Parker</h3>
              <p className="text-lg text-white/90 mb-4">Elder, Chairman</p>
            </div>

            {/* Jim Pitts */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_3.jpg"
                  alt="Jim Pitts"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Jim Pitts</h3>
              <p className="text-lg text-white/90 mb-4">Elder</p>
            </div>

            {/* Aaron Barney */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 rounded-full mx-auto bg-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">Photo Coming Soon</span>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Aaron Barney</h3>
              <p className="text-lg text-white/90 mb-4">Elder</p>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="w-full h-px bg-white/30 mb-16"></div>

          {/* Pastors Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Meet our Pastors
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
            {/* Greg Smith */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_1.jpg"
                  alt="Greg Smith"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Greg Smith</h3>
              <p className="text-lg text-white/90 mb-4">Lead Pastor</p>
            </div>

            {/* Kelly Graham */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_14.jpg"
                  alt="Kelly Graham"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Kelly Graham</h3>
              <p className="text-lg text-white/90 mb-4">Associate Pastor</p>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="w-full h-px bg-white/30 mb-16"></div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Meet our Staff
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Donna Faulk */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/bioImage_7.jpg"
                  alt="Donna Faulk"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Donna Faulk</h3>
              <p className="text-lg text-white/90 mb-4">Director of Children&apos;s Ministry and Financial Secretary</p>

            </div>

            {/* Daniell Smith */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 rounded-full mx-auto bg-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">Photo Coming Soon</span>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Daniell Smith</h3>
              <p className="text-lg text-white/90 mb-4">Staff</p>
            </div>

            {/* Audrey Yadon */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 rounded-full mx-auto bg-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">Photo Coming Soon</span>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Audrey Yadon</h3>
              <p className="text-lg text-white/90 mb-4">Staff</p>
            </div>

            {/* Justin Waycaster */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 rounded-full mx-auto bg-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">Photo Coming Soon</span>
                </div>
              </div>
              <h3 className="text-2xl font-light text-white mb-2">Justin Waycaster</h3>
              <p className="text-lg text-white/90 mb-4">Treasurer</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}