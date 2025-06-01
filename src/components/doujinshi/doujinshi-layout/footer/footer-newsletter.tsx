import * as Form from "@radix-ui/react-form"

const FooterNewsletter = () => {
  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    };
  return (
    <div>
      <h3 className="text-[#CFCFCF] font-semibold mb-4 uppercase tracking-wide text-xs">NEWSLETTER</h3>
      <Form.Root className="space-y-3" onSubmit={handleClick}>
        <Form.Field name="email">
          <Form.Control asChild>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 bg-[#FCFCFD] border border-gray-700 rounded-md text-[#4B4B4B] text-sm placeholder-[#4B4B4B]"
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="w-full px-4 py-2 bg-[#55D2FB] hover:bg-cyan-500 text-[#060A13] font-medium rounded-md transition-colors focus:outline-none">
            Subscribe Now
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}

export default FooterNewsletter
