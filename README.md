# Orders Service

Microservicio central para la creación, seguimiento y gestión de pedidos de e-commerce.

## 📋 Características
-   📋 **Creación de Pedidos**: Transaccionalidad garantizada.
-   📊 **Seguimiento**: Cambio de estados (PENDING, PAID, DELIVERED).
-   🧾 **Recibos**: Almacenamiento de referencias a recibos de pago.

## 🛠️ Tecnologías
-   NestJS
-   TypeScript
-   PostgreSQL / Prisma
-   RabbitMQ

## 🚀 Configuración
1.  **Variables de Entorno**:
    ```bash
    cp .env.example .env
    ```
2.  **Base de Datos**: Requiere PostgreSQL. Se recomienda ejecutar las migraciones:
    ```bash
    npx prisma migrate dev
    ```
3.  **Ejecución**:
    ```bash
    pnpm run start:dev
    ```

## 📡 Patrones de Mensajería
-   `create_order`: Punto de entrada para nuevos pedidos.
-   `get_orders_by_user`: Historial de usuario.
-   `mark_order_as_paid`: Actualización tras confirmación de pago.
