import { useState, type FormEvent } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import './CategoriesAdmin.css';

export default function CategoriesAdmin() {
  const { categories, createCategory, updateCategory, deleteCategory } = useCategories();
  const { products } = useProducts();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('category');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const iconOptions = ['steps', 'checkroom', 'sports_soccer', 'fitness_center', 'sports', 'backpack', 'watch', 'shield'];

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await createCategory({ name: newName, icon: newIcon });
    setNewName('');
    setNewIcon('category');
  };

  const startEdit = (id: string, name: string, icon: string) => {
    setEditingId(id);
    setEditName(name);
    setEditIcon(icon);
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim()) return;
    await updateCategory(editingId, { name: editName, icon: editIcon });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    const count = products.filter(p => p.categoryId === id).length;
    if (count > 0) {
      alert(`Esta categoría tiene ${count} producto(s) asociados. Reasigna los productos primero.`);
      setDeleteConfirm(null);
      return;
    }
    await deleteCategory(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="categories-admin">
      <div className="categories-admin__header">
        <h1 className="categories-admin__title">Categorías</h1>
        <p className="categories-admin__subtitle">{categories.length} categorías registradas</p>
      </div>

      {/* New Category Form */}
      <form className="categories-admin__form" onSubmit={handleCreate}>
        <div className="categories-admin__form-inner">
          <div className="cat-icon-select">
            <select value={newIcon} onChange={e => setNewIcon(e.target.value)}>
              {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
            <span className="material-symbols-outlined cat-icon-select__preview">{newIcon}</span>
          </div>
          <input
            type="text"
            className="categories-admin__input"
            placeholder="Nombre de la nueva categoría..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button type="submit" className="categories-admin__create-btn" disabled={!newName.trim()}>
            <span className="material-symbols-outlined">add</span>
            Crear
          </button>
        </div>
      </form>

      {/* Category List */}
      <div className="categories-admin__list">
        {categories.map(cat => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          const isEditing = editingId === cat.id;

          return (
            <div className={`cat-card ${isEditing ? 'cat-card--editing' : ''}`} key={cat.id}>
              <div className="cat-card__left">
                <div className="cat-card__icon-wrap">
                  {isEditing ? (
                    <select value={editIcon} onChange={e => setEditIcon(e.target.value)} className="cat-card__icon-edit">
                      {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  ) : (
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  )}
                </div>
                <div className="cat-card__info">
                  {isEditing ? (
                    <input
                      type="text"
                      className="cat-card__name-input"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <h3 className="cat-card__name">{cat.name}</h3>
                  )}
                  <p className="cat-card__count">{count} producto{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="cat-card__actions">
                {isEditing ? (
                  <>
                    <button className="cat-card__btn cat-card__btn--save" onClick={saveEdit}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="cat-card__btn" onClick={() => setEditingId(null)}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="cat-card__btn" onClick={() => startEdit(cat.id, cat.name, cat.icon)} title="Editar">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="cat-card__btn cat-card__btn--delete" onClick={() => setDeleteConfirm(cat.id)} title="Eliminar">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined admin-modal__icon">warning</span>
            <h3 className="admin-modal__title">¿Eliminar Categoría?</h3>
            <p className="admin-modal__text">Esta acción es permanente.</p>
            <div className="admin-modal__actions">
              <button className="admin-modal__btn admin-modal__btn--cancel" onClick={() => setDeleteConfirm(null)}>Cancelar</button>
              <button className="admin-modal__btn admin-modal__btn--danger" onClick={() => handleDelete(deleteConfirm)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
