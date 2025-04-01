export default function Footer() {
  return (
    <footer className="w-full p-4 bg-gray-100 text-gray-600 text-center">
      <p>© {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
      <div className="mt-2">
        <a href="#" className="text-gray-500 hover:text-blue-500 mx-2 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="text-gray-500 hover:text-blue-500 mx-2 transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}