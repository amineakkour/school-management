import HomeNavbar from "../components/Navbar";

function Card({title, createdAt, text, imgURL}) {
  return <div className="rounded-lg bg-stone-100 p-4 mb-10 shadow-md">
    <h3 className="text-xl">{title}</h3>
    <div className="text-gray-400 mb-3">Créé à {createdAt}</div>
    <div className="">
      <img src={imgURL} alt={title} className="w-[600px] max-h-[350px] object-cover shadow-lg" />
    </div>
    <p className="pt-2">{text}</p>
  </div>;
}

export default function Blog() {
  return (
    <div className="bg-stone-50 md:max-w-6xl p-5 mx-2 md:mx-auto">
      <div id="rain-bow"></div>
      <h1 className="text-4xl py-5">Blogs</h1>

      <Card title="Qu'est-ce que le Lorem Ipsum?" createdAt={"2023-09-03"} text={"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles"} imgURL={"http://www.fsts.ac.ma/wp-content/uploads/2020/03/PC090174.jpg"} />
      <Card title="Qu'est-ce que le Lorem Ipsum?" createdAt={"2023-09-03"} text={"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles"} imgURL={"https://www.jkeducate.co.uk/app/uploads/2022/08/classroom-2093744_1920.jpg.webp"} />  

  </div>
  )
}