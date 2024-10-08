FROM nginx:alpine

# Copia el contenido de la carpeta build al directorio correcto de Nginx
COPY ./build /usr/share/nginx/html

# Copia el archivo de configuración de Nginx a la ubicación adecuada
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx en modo de primer plano
CMD [ "nginx", "-g", "daemon off;" ]
