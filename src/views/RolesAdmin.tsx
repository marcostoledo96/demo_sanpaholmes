import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { PoliceButton } from './PoliceButton';
import { Shield, Plus, Edit2, Trash2, Save, X, CheckSquare, Square } from 'lucide-react';

interface Permiso {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
}

interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  permisos?: Permiso[];
}

interface PermisosPorCategoria {
  [categoria: string]: Permiso[];
}

export function RolesAdmin() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permisos, setPermisos] = useState<PermisosPorCategoria>({});
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<number | null>(null);
  const [creando, setCreando] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    activo: true,
    permisos: [] as number[]
  });
  
  // Obtener token desde localStorage
  const getToken = () => localStorage.getItem('token') || '';

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar roles
      const resRoles = await fetch(`${API_URL}/roles`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const dataRoles = await resRoles.json();
      
      // Cargar permisos
      const resPermisos = await fetch(`${API_URL}/roles/permisos/all`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const dataPermisos = await resPermisos.json();
      
      if (dataRoles.success) {
        setRoles(dataRoles.roles);
      }
      
      if (dataPermisos.success) {
        setPermisos(dataPermisos.permisos);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (role: Role) => {
    setEditando(role.id);
    setCreando(false);
    setFormData({
      nombre: role.nombre,
      descripcion: role.descripcion || '',
      activo: role.activo,
      permisos: role.permisos?.map(p => p.id) || []
    });
  };

  const iniciarCreacion = () => {
    setCreando(true);
    setEditando(null);
    setFormData({
      nombre: '',
      descripcion: '',
      activo: true,
      permisos: []
    });
  };

  const cancelar = () => {
    setEditando(null);
    setCreando(false);
    setFormData({ nombre: '', descripcion: '', activo: true, permisos: [] });
  };

  const togglePermiso = (permisoId: number) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permisoId)
        ? prev.permisos.filter(id => id !== permisoId)
        : [...prev.permisos, permisoId]
    }));
  };

  const guardarRol = async () => {
    if (!formData.nombre.trim()) {
      alert('El nombre del rol es obligatorio');
      return;
    }

    try {
      const url = creando 
        ? `${API_URL}/roles`
        : `${API_URL}/roles/${editando}`;
      
      const method = creando ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert(data.mensaje);
        cancelar();
        cargarDatos();
      } else {
        alert(data.mensaje || 'Error al guardar el rol');
      }
    } catch (error) {
      console.error('Error al guardar rol:', error);
      alert('Error al guardar el rol');
    }
  };

  const eliminarRol = async (id: number, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar el rol "${nombre}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/roles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert(data.mensaje);
        cargarDatos();
      } else {
        alert(data.mensaje || 'Error al eliminar el rol');
      }
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      alert('Error al eliminar el rol');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border-2 border-[#fbbf24] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-xl">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold">Gestión de Roles y Permisos</h1>
                <p className="text-gray-400 mt-1">Administra los roles del sistema y sus permisos</p>
              </div>
            </div>
            
            {!creando && !editando && (
              <PoliceButton
                variant="primary"
                icon={Plus}
                onClick={iniciarCreacion}
              >
                Nuevo Rol
              </PoliceButton>
            )}
          </div>
        </div>

        {/* Formulario de Creación/Edición */}
        {(creando || editando) && (
          <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border-2 border-[#fbbf24] rounded-2xl p-6 mb-8">
            <h2 className="text-white text-2xl font-bold mb-6">
              {creando ? 'Crear Nuevo Rol' : 'Editar Rol'}
            </h2>
            
            <div className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Nombre del Rol *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#fbbf24]/30 rounded-xl text-white focus:border-[#fbbf24] focus:outline-none"
                  placeholder="ej: moderador, editor, etc."
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#fbbf24]/30 rounded-xl text-white focus:border-[#fbbf24] focus:outline-none resize-none"
                  rows={3}
                  placeholder="Descripción del rol y sus responsabilidades"
                />
              </div>

              {/* Activo */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="w-5 h-5"
                />
                <label className="text-gray-300 font-semibold">Rol activo</label>
              </div>

              {/* Permisos */}
              <div>
                <label className="block text-gray-300 mb-4 font-semibold text-lg">
                  Permisos del Rol ({formData.permisos.length} seleccionados)
                </label>
                
                <div className="space-y-6">
                  {Object.entries(permisos).map(([categoria, permisosCategoria]) => (
                    <div key={categoria} className="bg-[#0a0a0a] border-2 border-[#fbbf24]/20 rounded-xl p-4">
                      <h3 className="text-[#fbbf24] font-bold text-lg mb-3 capitalize">
                        {categoria}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permisosCategoria.map((permiso) => (
                          <div
                            key={permiso.id}
                            onClick={() => togglePermiso(permiso.id)}
                            className="flex items-start gap-3 p-3 bg-[#1f1f1f] rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-colors border border-transparent hover:border-[#fbbf24]/30"
                          >
                            {formData.permisos.includes(permiso.id) ? (
                              <CheckSquare className="w-5 h-5 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                            )}
                            
                            <div>
                              <p className="text-white font-medium">{permiso.nombre}</p>
                              <p className="text-gray-400 text-sm">{permiso.descripcion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <PoliceButton
                  variant="primary"
                  icon={Save}
                  onClick={guardarRol}
                >
                  Guardar Rol
                </PoliceButton>
                
                <PoliceButton
                  variant="secondary"
                  icon={X}
                  onClick={cancelar}
                >
                  Cancelar
                </PoliceButton>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Roles */}
        {!creando && !editando && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] border-2 border-[#fbbf24]/30 rounded-xl p-6 hover:border-[#fbbf24] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">{role.nombre}</h3>
                    {role.descripcion && (
                      <p className="text-gray-400 text-sm mt-1">{role.descripcion}</p>
                    )}
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    role.activo 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}>
                    {role.activo ? 'Activo' : 'Inactivo'}
                  </div>
                </div>

                <div className="border-t border-[#fbbf24]/20 pt-4 mb-4">
                  <p className="text-gray-400 text-sm mb-2">
                    {role.permisos?.length || 0} permisos asignados
                  </p>
                  
                  {role.permisos && role.permisos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {role.permisos.slice(0, 3).map((permiso) => (
                        <span
                          key={permiso.id}
                          className="px-2 py-1 bg-[#fbbf24]/10 text-[#fbbf24] text-xs rounded-md border border-[#fbbf24]/30"
                        >
                          {permiso.nombre}
                        </span>
                      ))}
                      
                      {role.permisos.length > 3 && (
                        <span className="px-2 py-1 bg-[#fbbf24]/10 text-[#fbbf24] text-xs rounded-md border border-[#fbbf24]/30">
                          +{role.permisos.length - 3} más
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicion(role)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#fbbf24]/20 hover:bg-[#fbbf24]/30 text-[#fbbf24] rounded-lg transition-colors border border-[#fbbf24]/50"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  
                  {!['admin', 'vendor'].includes(role.nombre) && (
                    <button
                      onClick={() => eliminarRol(role.id, role.nombre)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
