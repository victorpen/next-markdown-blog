import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import matter from 'gray-matter'
import Post from '../components/Post'
import { sortByDate } from '../utils'

// export default function Home() {
export default function Home({ posts }) {
  
  console.log(posts);

  return (
    <div>
      <Head>
        <title>Next-Markdown-Blog</title>
      </Head>

      {/* <h2>hello !!</h2> */}

      <div className='posts'>
        {posts.map((post, index) => (
          // <dir key={index}>
          //   <img src={post.frontmatter.cover_image} alt='' />
          //   <div className='post-date'>Posted on {post.frontmatter.date}</div>
          //   <h3>{post.frontmatter.title}</h3>
          // </dir>
          <Post key={index} post={post} />
        ))}
      </div>      

    </div>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))
  
  console.log(files);

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    
    // console.log(markdownWithMeta);

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,      
    }
  })

  // console.log(posts);

  return {
    props: {
      posts: posts.sort(sortByDate),
      // posts: 'The Posts',
      // posts: posts,
      // posts,
    },
  }
}  