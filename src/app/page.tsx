import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-bold">CMPE 496 Working Base</h1>
        
        <p className="text-xl max-w-2xl">
          A simple interactive graphics editor that allows you to create, move, and erase 
          various shapes including squares, circles, and lines.
        </p>
        
        <div className="mt-4">
          <Link 
            href="/drawing-editor" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Drawing Editor (src/app/drawing-editor/page.tsx)
          </Link>
        </div>
        <div className="mt-4">
          <Link 
            href="/drawing-editor" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            CheapShop (Soon)
          </Link>
        </div>
      </main>
    </div>
  );
}
