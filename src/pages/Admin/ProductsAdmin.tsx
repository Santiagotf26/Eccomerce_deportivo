import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import ProductForm from './ProductForm';
import type { Product } from '../../types';
import './ProductsAdmin.css';
import Swal from 'sweetalert2';

export default function ProductsAdmin() {
  const { products, loading, deleteProduct, updateProduct, fetchProducts } = useProducts({ admin: true });
  const { categories } = useCategories();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || p.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product: Product) => {
    Swal.fire({
      title: '¿Desactivar Producto?',
      text: 'El producto quedará oculto en la tienda, pero seguirá disponible en el panel de admin.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(product.id);
        Swal.fire({
           title: '¡Desactivado!',
           text: 'El producto ha sido desactivado.',
           icon: 'success',
           timer: 1500,
           showConfirmButton: false
        });
      }
    });
  };

  const handleTogglePublished = async (product: Product) => {
    const actionName = product.isPublished ? 'desactivar' : 'activar';
    const result = await Swal.fire({
      title: `¿Deseas ${actionName} este producto?`,
      text: product.name,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: product.isPublished ? '#ef4444' : '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Sí, ${actionName}`,
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      await updateProduct(product.id, { isPublished: !product.isPublished });
      Swal.fire({
        title: '¡Actualizado!',
        text: `El producto ha sido ${product.isPublished ? 'desactivado' : 'activado'}.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onClose={handleFormClose}
        onSaved={async () => {
          await fetchProducts();
          Swal.fire({
             title: editingProduct ? '¡Producto actualizado!' : '¡Producto agregado!',
             icon: 'success',
             timer: 1500,
             showConfirmButton: false
          });
          handleFormClose();
        }}
      />
    );
  }

  return (
    <div className="products-admin">
      <div className="products-admin__header">
        <div>
          <h1 className="products-admin__title">Productos</h1>
          <p className="products-admin__count">{products.length} productos en total</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="products-admin__add-btn" onClick={() => setShowForm(true)}>
            <span className="material-symbols-outlined">add</span>
            Nuevo Producto
          </button>
        </div>
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="products-admin__product-cell">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="products-admin__thumb" />
                      ) : (
                        <div className="products-admin__thumb" style={{ background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>image</span>
                        </div>
                      )}
                      <div>
                        <p className="products-admin__product-name">{p.name}</p>
                        {p.badge && <span className="products-admin__badge">{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td><span className="products-admin__cat-chip">{p.category}</span></td>
                  <td>
                    <span className="products-admin__price">${(p.price || 0).toFixed(2)}</span>
                    {p.originalPrice && <span className="products-admin__original">${(p.originalPrice || 0).toFixed(2)}</span>}
                  </td>
                  <td>
                    <div className="products-admin__rating">
                      <span className="material-symbols-outlined filled" style={{ fontSize: '1rem', color: '#f59e0b' }}>star</span>
                      {p.rating}
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: p.isPublished ? '#10b981' : '#ef4444',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'inline-block',
                        textAlign: 'center'
                      }}
                    >
                      {p.isPublished ? 'Activo' : 'Desactivado'}
                    </span>
                  </td>
                  <td>
                    <div className="products-admin__actions">
                      <button
                        className="products-admin__action-btn"
                        onClick={() => handleTogglePublished(p)}
                        title={p.isPublished ? 'Desactivar producto' : 'Activar producto'}
                      >
                        <span className="material-symbols-outlined">{p.isPublished ? 'toggle_off' : 'toggle_on'}</span>
                      </button>
                      <button className="products-admin__action-btn products-admin__action-btn--edit" onClick={() => handleEdit(p)} title="Editar">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="products-admin__action-btn products-admin__action-btn--delete" onClick={() => handleDeleteClick(p)} title="Eliminar/Desactivar">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="products-admin__empty">No se encontraron productos</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
