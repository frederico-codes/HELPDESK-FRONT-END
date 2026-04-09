type Props = React.ComponentProps<"input"> & {
  legend?: string
  error?: string
}

export function Input({ legend, type, error, ...rest }: Props) {
  return (
    <fieldset className="flex flex-col">
      {legend && (
        <legend className="uppercase mb-2 text-xxs text-gray-400">
          {legend}
        </legend>
      )}

      <input
        type={type}
        {...rest}
        className="
          w-full h-6 outline-none pb-2.5 border-b-2 border-gray-500 text-gray-100         
          focus:border-blue-700
        "
      />

      {error && (
        <span className="text-red-600 text-xs mt-1">
          {error}
        </span>
      )}
    </fieldset>
  )
}