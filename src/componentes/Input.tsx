type Props = React.ComponentProps<"input"> & {
  legend?: string
  error?: string
}

export function Input({ legend, type, error, ...rest }: Props) {
  return (
    <fieldset className="flex flex-col max-h-24">
      {legend && (
        <legend className="uppercase mb-2 text-xxs text-gray-400">
          {legend}
        </legend>
      )}

      <input
        type={type}
        {...rest}
        className={`
          w-full h-6 outline-none pb-2.5 border-b-2
          ${error ? "border-red-500" : "border-gray-500"}
          ${error ? "text-red-500" : "text-gray-100"}
          focus:border-blue-700
        `}
      />

      {error && (
        <span className="text-red-500 text-xxs mt-1">
          {error}
        </span>
      )}
    </fieldset>
  )
}