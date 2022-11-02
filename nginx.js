sever {
    listen 80;
	listen[::]: 80;

    server_name gn - pix.uhzero.com.br;

	access_log /var/log/nginx / gn - pab.log;
	error_log /var/log/nginx / gn - pab.log;

	location / {
		add_header Content- Type text / html;
	return 200 'API Pix';
}
}