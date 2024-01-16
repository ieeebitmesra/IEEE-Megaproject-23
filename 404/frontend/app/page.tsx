import Image from 'next/image'
import Footer from './components/ui/footer'
import Header from './components/ui/header'
import Link from 'next/link'

import YoutubeEmbed from './components/YoutubeEmbed'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <Header />
      
      <section id="hero" className='flex flex-col items-center'>
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="blob-a"></div>
          <div className="blob-c -z-10">
            <div className="shape-blob"></div>
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
            <div className="shape-blob three"></div>
            <div className="shape-blob four"></div>
            <div className="shape-blob five"></div>
            <div className="shape-blob six"></div>
            <div className="shape-blob seven"></div>
            <div className="shape-blob eight"></div>
            <div className="shape-blob nine"></div>
            <div className="shape-blob ten"></div>
            <div className="shape-blob eleven"></div>
          </div>
          <h1 className="text-4xl md:text-6xl max-w-6xl font-bold text-center text-gray-800 dark:text-white lg:text-7xl">NewsX: Revolutionizing News Delivery Through AI</h1>
          <p className="mt-4 text-lg md:text-xl text-center text-gray-600 dark:text-gray-400">Cutting-edge technology transforms traditional news articles into dynamic, engaging video content</p>
          <div className="flex flex-col items-center justify-center mt-6 space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row">
            <a href="#intro" className="px-6 py-3 text-lg text-white bg-gray-800 rounded-md hover:bg-gray-700">Get Started</a>
            <Link
              href="#video"
            >
              <button className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 rounded-md overflow-hidden h-12 w-40 bg-sky-200 p-2 flex justify-center items-center font-bold">
                <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                <p className="z-10">Learn more</p>
              </button>
            </Link>
          </div>
        </div>    
      </section>

      <section id='video' className='flex flex-col items-center justify-center gap-y-12 w-full md:h-screen py-20 bg-gradient-to-tl from-gray-700 via-gray-900 to-black'>

          <h2 className='text-3xl lg:text-5xl font-bold text-gray-800 dark:text-white max-w-6xl'>Our Project</h2>
          {/* <p className='mt-4 text-xl text-center text-gray-600 dark:text-gray-400 max-w-3xl'>Welcome to NewsX, we leverage a seamless integration of state-of-the-art APIs and models to create a visually immersive news experience.</p> */}

        <div className='w-full max-w-5xl'>
          <iframe src="https://www.youtube.com/embed/yorTG9at90g" title="Why Does Celeste Feel So Good to Play?"
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
            className=' aspect-video w-full'
          ></iframe>
        </div>
      </section>

      <section id="intro" className='flex flex-col items-center justify-around w-full py-12 sm:px-12 md:px-20 lg:px-32 gap-y-12'>
        <div className="blob-a"></div>
        <div className="blob-c -z-10">
          <div className="shape-blob"></div>
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
          <div className="shape-blob three"></div>
          <div className="shape-blob four"></div>
          <div className="shape-blob five"></div>
          <div className="shape-blob six"></div>
          <div className="shape-blob seven"></div>
          <div className="shape-blob eight"></div>
          <div className="shape-blob nine"></div>
          <div className="shape-blob ten"></div>
          <div className="shape-blob eleven"></div>
        </div>
        <div className='flex flex-col-reverse gap-y-4 md:gap-x-2 md:flex-row items-center md:justify-between max-w-6xl'>
          <div className='flex flex-col items-center md:items-start justify-center w-11/12 md:w-1/2'>
            <h2 className='text-3xl text-center md:text-4xl md:text-left font-bold text-gray-800 dark:text-white'>Text-to-Avatar Video Creation</h2>
            <p className='mt-4 text-lg md:text-xl text-center sm:text-left text-gray-600 dark:text-gray-400'>Utilizing state-of-the-art lipsyncing technology, the synthesized audio is seamlessly integrated with an avatar, creating a visually compelling representation of the news content. This process combines the summarization of news articles using the BERT model, followed by the conversion of summarized text into lifelike speech with the Eleven Labs API.</p>
          </div>
          <div className='flex flex-col items-center justify-center w-11/12 md:w-1/2'>
            <Image src='/man-reading-news.jpg' width={500} height={500} alt='Man Reading News' />
          </div>
        </div>

        <div className='flex flex-col gap-y-2 md:flex-row items-center justify-between max-w-6xl'>
          <div className='flex flex-col gap-y-4 md:gap-x-2 items-center justify-center w-11/12 md:w-1/2'>
            <Image src='/sample.jpg' width={500} height={500} alt='News Cartoon'/>
          </div>
          <div className='flex flex-col items-center sm:items-end justify-center w-11/12 md:w-1/2'>
            <h2 className='text-3xl text-center md:text-right md:text-4xl font-bold text-gray-800 dark:text-white'>Automated Video Upload</h2>
            <p className='mt-4 text-lg md:text-xl text-center sm:text-right text-gray-600 dark:text-gray-400'>The finalized video, featuring the lipsynced avatar and additional visual elements, is automatically uploaded to our designated YouTube channel using the YouTube API. This automated process ensures that our audience has access to the latest news in an engaging format, with scheduling options for daily updates.</p>
          </div>
        </div>
      </section>
      
      <Footer />

    </main>
  )
}
