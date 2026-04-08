type Props = React.ComponentProps<"select"> & {
  legend?: string
  error?: string
}

export function Select({ legend, error, children, ...rest }: Props) {
  return (
    <fieldset className="flex flex-col max-h-24">
      {legend && (
        <legend className="uppercase text-xxs mb-2 text-gray-400">
          {legend}
        </legend>
      )}

      <select
        className={`
          w-full h-12 rounded-lg px-4 text-sm bg-transparent outline-none
          ${error ? "border-2 border-red-500 text-red-500" : "border border-gray-300 text-gray-100"}
          focus:border-blue-600
        `}
        {...rest}
      >
        <option value="" disabled hidden>
          Selecione
        </option>
        {children}
      </select>

      {error && (
        <span className="text-red-500 text-xxs mt-1">
          {error}
        </span>
      )}
    </fieldset>
  )
}