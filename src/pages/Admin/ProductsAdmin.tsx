import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import ProductForm from './ProductForm';
import type { Product } from '../../types';
import './ProductsAdmin.css';

export default function ProductsAdmin() {
  const { products, loading, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || p.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirm(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return <ProductForm product={editingProduct} onClose={handleFormClose} />;
  }

  return (
    <div className="products-admin">
      <div className="products-admin__header">
        <div>
          <h1 className="products-admin__title">Productos</h1>
          <p className="products-admin__count">{products.length} productos en total</p>
        </div>
        <button className="products-admin__add-btn" onClick={() => setShowForm(true)}>
          <span className="material-symbols-outlined">add</span>
          Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <div className="products-admin__filters">
        <div className="products-admin__search">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="products-admin__select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="products-admin__loading">Cargando productos...</div>
      ) : (
        <div className="products-admin__table-wrap">
          <table className="products-admin__table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Rating</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="products-admin__product-cell">
                      <img src={p.image} alt={p.name} className="products-admin__thumb" />
                      <div>
                        <p className="products-admin__product-name">{p.name}</p>
                        {p.badge && <span className="products-admin__badge">{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td><span className="products-admin__cat-chip">{p.category}</span></td>
                  <td>
                    <span className="products-admin__price">${p.price.toFixed(2)}</span>
                    {p.originalPrice && <span className="products-admin__original">${p.originalPrice.toFixed(2)}</span>}
                  </td>
                  <td>
                    <div className="products-admin__rating">
                      <span className="material-symbols-outlined filled" style={{ fontSize: '1rem', color: '#f59e0b' }}>star</span>
                      {p.rating}
                    </div>
                  </td>
                  <td>
                    <div className="products-admin__actions">
                      <button className="products-admin__action-btn products-admin__action-btn--edit" onClick={() => handleEdit(p)} title="Editar">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="products-admin__action-btn products-admin__action-btn--delete" onClick={() => setDeleteConfirm(p.id)} title="Eliminar">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="products-admin__empty">No se encontraron productos</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined admin-modal__icon">warning</span>
            <h3 className="admin-modal__title">¿Eliminar Producto?</h3>
            <p className="admin-modal__text">Esta acción no se puede deshacer. El producto será eliminado permanentemente.</p>
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
