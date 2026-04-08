import { classMerge } from "../utils/classMerge"


type Props = React.ComponentProps<"button"> &
{
  isLoading?: boolean
  variant?: "base" | "light"
  className?: string
} 


const variants = {
  button:
    {
      base: " bg-gray-200 hover:bg-gray-300 transition ease-linear ",
      light: "bg-gray-500 hover:bg-gray-600 transition ease-linear text-gray-200",
    }
}

export function Button({
  children,
  isLoading, 
  className,
  type="button",  
  variant = "base",
  ...rest
}:Props
){
  return(
    <button 
      type= { type }   
      disabled = { isLoading }
      className={classMerge(["w-full flex justify-center items-center py-1.5 text-white rounded-lg cursor-pointer mt-10",
      variants.button[variant],
      isLoading && "cursor-progress", 
      className    
      ])}
      
      {...rest} 
    >
      { children }
    </button>
  )
}