export function NotFound(){
  return(
    <div className="w-screen h-screen flex justify-center items-center text-center ">
      <div className="flex flex-col">
        <h1 text-gray-100 font-semibold text-2xl mb-10>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a 
        href="/"
        className="font-semibold text-blue-500 hover:text-blue-700 transition ease-linear"
        >
          Click here to go back to the homepage
        </a>
      </div>
    </div>
  )
}