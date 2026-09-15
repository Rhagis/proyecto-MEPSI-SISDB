-- archivo: init.sql
--
-- PostgreSQL database dump
--

\restrict AK7hGVUdeg3fmgrXezWeMeoKitfgnUWN9zINvOl99d847FcUT5X4d96WV39mCQO

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    titulo character varying(150) NOT NULL,
    contenido text NOT NULL,
    autor_id integer NOT NULL
);


ALTER TABLE public.publicaciones OWNER TO postgres;

--
-- Name: publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.publicaciones ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.publicaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    usuario character varying(50) NOT NULL,
    contrasena character varying(255) NOT NULL,
    email character varying(150) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: publicaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publicaciones (id, titulo, contenido, autor_id) FROM stdin;
1	Prueba de ruta	Contenido de la prueba	3
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, usuario, contrasena, email, activo, fecha_creacion) FROM stdin;
1	Matias	$2b$10$RnKgG0t93oGACwphTdd2mO7T39WoeRIfgThaqOuSUBAzrwj892dqC	matiaspicasso017@gmail.com	t	2026-08-31 22:02:35.281889
2	Matias2	$2b$10$AMgUtL.X5kuuCs73DyvvPO5urJS7GJNU0tfh9t5Z9JznH80dUYpqG	matias02@gmail.com	f	2026-09-01 20:19:21.689839
3	Rhagis	$2b$10$tKAQVFyWpJppvSeC4sh2g.2.0YTnmWf5x2P1qvD./UepI.h15B9gW	Rhagis@gmail.com	t	2026-09-07 19:34:02.007286
4	Rhagiss	$2b$10$8Qyhdco2IDRsLCRpacPAYO0cC48yD4XyZBlIzrIoqxa1KzQDisK16	Rhagiss@gmail.com	t	2026-09-07 19:35:48.584352
6	Rhagisss	$2b$10$hUc2FtZi8rqkyLCv6lXEcuQSsbrbXxu3yYXI/C5IHKD/mnx66JY2q	Rhagisss@gmail.com	t	2026-09-07 19:38:16.690265
10	Matiass	$2b$10$znug1hLWv0CfU5XAHo/dGemRzCWZh5ZZ0TFfboh82xIVvzqmy5KPu	matias017@gmail.com	t	2026-09-07 20:14:40.216532
\.


--
-- Name: publicaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicaciones_id_seq', 1, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 10, true);


--
-- Name: publicaciones publicaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_usuario_key UNIQUE (usuario);


--
-- Name: publicaciones publicaciones_autor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict AK7hGVUdeg3fmgrXezWeMeoKitfgnUWN9zINvOl99d847FcUT5X4d96WV39mCQO

