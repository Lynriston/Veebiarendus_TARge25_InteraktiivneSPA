export default function FilterBar({ setFilter, current }: any) {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter('all')} className={current === 'all' ? 'active' : ''}>
        Kõik
      </button>

      <button onClick={() => setFilter('liked')} className={current === 'liked' ? 'active' : ''}>
        Lemmikud
      </button>

      <button onClick={() => setFilter('newest')} className={current === 'newest' ? 'active' : ''}>
        Uusimad
      </button>

      <button onClick={() => setFilter('oldest')} className={current === 'oldest' ? 'active' : ''}>
        Vanimad
      </button>
    </div>
  );
}