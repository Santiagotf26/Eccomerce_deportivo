import { useState, type FormEvent } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import './CategoriesAdmin.css';
import Swal from 'sweetalert2';

export default function CategoriesAdmin() {
  const { categories, createCategory, updateCategory, deleteCategory } = useCategories();
  const { products } = useProducts();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('category');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const iconOptions = ['steps', 'checkroom', 'sports_soccer', 'fitness_center', 'sports', 'backpack', 'watch', 'shield'];

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await createCategory({ name: newName, slug: newName.toLowerCase().replace(/\s+/g, '-'), icon: newIcon });
    
    Swal.fire({
      title: '¡Categoría creada!',
      text: `La categoría "${newName}" ha sido agregada con éxito.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });

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
    
    Swal.fire({
      title: '¡Cambios guardados!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    setEditingId(null);
  };

  const handleDeleteClick = async (cat: any) => {
    const count = products.filter(p => p.categoryId === cat.id).length;
    
    if (count > 0) {
      Swal.fire({
        title: 'No se puede eliminar',
        text: `Esta categoría tiene ${count} producto(s) asociados. Reasigna o elimina los productos primero.`,
        icon: 'error',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar Categoría?',
      text: `¿Estás seguro de eliminar "${cat.name}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (isConfirmed) {
      await deleteCategory(cat.id);
      Swal.fire({
        title: '¡Eliminado!',
        text: 'La categoría ha sido eliminada correctamente.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
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
                    <button className="cat-card__btn" onClick={() => startEdit(cat.id, cat.name, cat.icon ?? 'category')} title="Editar">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="cat-card__btn cat-card__btn--delete" onClick={() => handleDeleteClick(cat)} title="Eliminar">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
