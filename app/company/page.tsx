// app/developers/page.tsx
export default function Developers() {
  return (
    <main className="p-12 text-white bg-[#0B1220] min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Developer APIs</h1>

      <div className="bg-black p-6 rounded-xl font-mono text-green-400">
{`POST /v1/virtual-accounts
{
  "name": "John Doe"
}`}
      </div>
    </main>
  );
}