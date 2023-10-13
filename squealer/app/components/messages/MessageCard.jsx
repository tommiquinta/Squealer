'use client'

import Card from '../Card'
import moment from 'moment'
import Avatar from '../Avatar'
import Link from 'next/link'
import Media from '../media/Media'

export default function PostCard ({ post, children, author_uuid }) {
  const uploads = post?.photos

  const date = new Date(post.created_at)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString(undefined, options)
  var postContent = post.content

  function createMentions (content) {
    const words = content.split(' ')
    const contentWithLinks = words.map((word, index) => {
      if (word.startsWith('§')) {
        const keyword = word.substring(1)

        return `<a href=/channels/${keyword} class="text-blue-500 hover:underline">§${keyword}</a>`
      } else if (word.startsWith('@')) {
        const keyword = word.substring(1)

        return `<a href=/profiles/${keyword} class="text-blue-500 hover:underline">@${keyword}</a>`
      } else if (word.match(/(^|[^"'])(www\..+?\..+?)(\s|$)/)) {
        return replaceWWWLinks(word)
      }
      return word
    })

    return contentWithLinks.join(' ')
  }

  function replaceWWWLinks (content) {
    const linkRegex = /(^|[^"'](www\..+?\..+?)(\s|$))/g
    const contentWithLinks = content.replace(linkRegex, p2 => {
      return `<a class="text-blue-500 hover:underline" href="http://${p2}" target="_blank">${p2}</a>`
    })
    return contentWithLinks
  }

  var isAuthor = false
  if (post.author.id == author_uuid) {
    isAuthor = true
  }
  return (
    <div
      className={`flex gap-3 ${
        isAuthor ? 'items-center flex-row-reverse' : 'items-center'
      }`}
    >
      <div>
        <Link href={`/profiles/${post?.author.username}`}>
          <span className='cursor-pointer'>
            <Avatar url={post?.author.avatar} />
          </span>
        </Link>
      </div>
      <Card add={'w-fit'}>
        <div
          className={`flex gap-3 w-full items-center ${
            isAuthor ? 'items-end flex-row-reverse' : ''
          }`}
        >
          <div className='w-full'>
            <div
              dangerouslySetInnerHTML={{
                __html: createMentions(postContent)
                  .replace('https:/', '')
                  .replace('http', '')
              }}
            ></div>
            {uploads?.length > 0 && (
              
              <div
                className='w-48 md:w-96 h-full rounded-2xl bg-center'
              >
                <Media media={uploads} />
              </div>
            )}
          </div>
        </div>
        <div>
          <p className='text-gray-500 text-sm mt-5'>
            {date.getHours() + ':' + date.getMinutes() + ', ' + formattedDate}
          </p>
        </div>
      </Card>
    </div>
  )
}
