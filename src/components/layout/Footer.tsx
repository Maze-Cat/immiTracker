export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          ImmiTracker — For informational purposes only. Not legal advice.
        </p>
        <p className="text-xs mt-2">
          Data sourced from{' '}
          <a href="https://travel.state.gov" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
            U.S. Department of State
          </a>{' '}
          and{' '}
          <a href="https://uscis.gov" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
            USCIS
          </a>
        </p>
      </div>
    </footer>
  );
}
