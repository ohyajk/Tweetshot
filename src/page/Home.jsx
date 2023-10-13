import React from 'react'
import { enableReactUse } from '@legendapp/state/config/enableReactUse'
import { observable } from '@legendapp/state'
import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'

enableReactUse() // This adds the use() function to observables

const state =  observable({ name: '', img: '', username: '', isVerified: true, content: '' })

const Svg = () => <svg height="20" fill="#26a7de" viewBox="0 0 22 22" aria-label="Verified account" role="img" className='text-tw-prime'><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>

const Home = () => {

  const name = state.name.use()
  const img = state.img.use()
  const username = state.username.use()
  const isVerified = state.isVerified.use()
  const content = state.content.use()

  console.log(img)

  const exportImg = () => {
    htmlToImage
      .toSvg(document.getElementById('canvas'))
      .then(function (dataUrl) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `tweetshot-${username}.svg`;
        a.click();
      })

  }

  return (
    <>
    <div className='flex justify-center items-center'>
      <form className='flex flex-col justify-center items-start p-8 gap-4 w-[350px]'>
      <span className='flex flex-col justify-start gap-2 w-full'>
          <label className='text-white/80' htmlFor="img">Your Twitter Profile Image URL</label>
          <input onChange={(e) => state.img.set(e.target.value)} value={state.img.get()} className='px-4 py-2 focus:outline focus:outline-2 outline-blue-400' type="text" name="img" placeholder="Your Twitter Profile Picture link" />
        </span>
        {/* Name */}
        <span className='flex flex-col justify-start gap-2 w-full'>
          <label className='text-white/80' htmlFor="name">Your Twitter Name</label>
          <input onChange={(e) => state.name.set(e.target.value)} value={state.name.get()} className='px-4 py-2 focus:outline focus:outline-2 outline-blue-400' type="text" name="name" placeholder="Your Name" />
        </span>
        {/* UserName */}
        <span className='flex flex-col justify-start gap-2 w-full'>
          <label className='text-white/80' htmlFor="username">Your Twitter UserName</label>
          <input onChange={(e) => state.username.set(e.target.value)} value={state.username.get()} className='px-4 py-2 focus:outline focus:outline-2 outline-blue-400' type="text" name="username" placeholder="Your @UserName" />
        </span>
        {/* isVerified */}
        <span className='flex flex-col justify-start gap-2'>
          <label className='text-white/80 flex items-center gap-2' htmlFor="username"><p>Show Verified Checkmark ?</p><Svg/></label>
          <span className='flex items-center gap-2'>
            <input onChange={(e) => state.isVerified.set(true)} value={state.isVerified.get()} type='radio' name='verified'  defaultChecked />
            <h4>Yes</h4>
          </span>
          <span className='flex items-center gap-2'>
            <input onChange={(e) => state.isVerified.set(false)} value={state.isVerified.get()} type='radio' name='verified' />
            <h4>No</h4>
          </span>
        </span>
        {/* Content */}
        <span className='flex flex-col justify-start gap-2 w-full'>
        <label className='text-white/80' htmlFor="username">Your Tweet Text</label>
        <textarea onChange={(e) => state.content.set(e.target.value)} value={state.content.get()} className='px-4 py-2 focus:outline focus:outline-2 outline-blue-400' placeholder='Your Text Here...' rows="4"/>
        </span>
      </form>
    </div>
    {/* Preview */}
    <div className='mb-4 flex flex-col justify-center items-center'>
      <h2 className='py-4 text-2xl font-bold'>Preview</h2>
        <div className='p-4 min-h-[200px] w-[500px] bg-black ' id='canvas'>
          <div className='flex items-center gap-2'>
            <img className='w-12 h-12 rounded-full' src={img || "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" } alt="dp" />
            <div className='flex flex-col justify-center'>
              <h3 className='font-bold flex gap-1 items-center'>{name == '' ? 'Your Name' : name}{isVerified ? <Svg/> : ''}</h3>
              <h4 className='text-tw-prime'>@{username == '' ? 'UserName' : username}</h4>
            </div>
          </div>
          <p className='text-white/80 break-words mt-1.5 pl-14'>
            {content == '' ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem?' : content}
          </p>
        </div>
    </div>
    <div className='flex justify-center mb-8'>
    <button onClick={exportImg} className='text-lg font-semibold bg-tw-prime px-8 py-2 rounded-full text-center'>Export as Image</button>
    </div>
        </>
  )
}

export default Home