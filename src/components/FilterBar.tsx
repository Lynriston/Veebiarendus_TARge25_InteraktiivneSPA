//Kuvab filtririba, mis võimaldab kasutajal valida, milliseid postitusi ta soovib näha: kõiki, lemmikuid, uusimaid või vanimaid.
export default function FilterBar({ setFilter, current }: any) {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter('all')} className={current === 'all' ? 'active' : ''}>
        All
      </button>

      <button onClick={() => setFilter('liked')} className={current === 'liked' ? 'active' : ''}>
        Favorites
      </button>

      <button onClick={() => setFilter('newest')} className={current === 'newest' ? 'active' : ''}>
        Newest
      </button>

      <button onClick={() => setFilter('oldest')} className={current === 'oldest' ? 'active' : ''}>
        Oldest
      </button>
    </div>
  );
}