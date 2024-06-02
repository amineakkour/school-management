import { useEffect, useState } from "react";
import { customAxios } from "../../api/customAxios";
import { formatDate } from "../../functions/formatDate";
import { Skeleton } from "@/components/ui/skeleton"
import Alert from "../../components/Alert";

function BlogSkelaton() {
  return <div className={`bg-secondary rounded-lg p-4 mb-10 shadow-md pop-up`}>
    <Skeleton className="bg-black/15 w-96 h-[20px]"></Skeleton>
    <Skeleton className="bg-black/15 w-20 h-[15px] my-3"></Skeleton>
    <Skeleton className="w-[600px] h-[350px] bg-black/15">
    </Skeleton>
    <div className="pt-4">
      <Skeleton className="w-full h-[10px] bg-black/15 my-1"/>
      <Skeleton className="w-[calc(100%-20px)] h-[10px] bg-black/15 my-1"/>
      <Skeleton className="w-96 h-[10px] bg-black/15 my-1"/>
    </div>
  </div>;
}

function Card({title, createdAt, text, imgURL}) {
  return <div className={`bg-secondary rounded-lg p-4 mb-10 shadow-md`}>
    <h3 className="text-xl">{title}</h3>
    <div className="text-gray-400 mb-3">Créé le {createdAt}</div>
    <div className="w-[600px] h-[350px] bg-gray-200">
      <img src={imgURL} alt={title} className="w-full h-full object-cover shadow-lg" />
    </div>
    <p className="pt-4">{text}</p>
  </div>;
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isFetched, setIsFetached] = useState(false);
  const [alertText, setAlertText] = useState("")

  async function fetchData() {
    try{
      const response = await customAxios('/blogs');
      setBlogs(response.data)
    }catch(error) {
      setAlertText("Quelque chose s'est mal passé");
      console.log(error)
    }

    setIsFetached(true)
  } 

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={`md:max-w-6xl p-5 mx-2 md:mx-auto`}>
      {alertText && <Alert alertText={alertText} setAlertText={setAlertText} />}
      <div id="rain-bow"></div>
      <h1 className="text-4xl py-5">Blogs</h1>

      {
        isFetched
        ?
        blogs.map((blog, ind) => <Card key={ind} title={blog.title} createdAt={formatDate(blog.created_at)} text={blog.content} imgURL={`${import.meta.env.VITE_BACKEND_URL}${blog.photo_url}`} />)
        :
        Array.from(Array(5).keys()).map(i => <BlogSkelaton key={i} />)
      }
  </div>
  )
}