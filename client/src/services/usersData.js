import axios from "axios";

const tokenAcces = localStorage.getItem('token');

export const getTranslators = async () => {

  const translators = await axios.get("http://localhost:3311/api/translators",{
    headers: {  'jwt-token': tokenAcces }});
  return translators.data;
};

export const getClients = async () => {

  const clients = await axios.get("http://localhost:3311/api/clients",{
    headers: {  'jwt-token': tokenAcces }});
  return clients.data;
};

export const getTranslator = async (id) => {
  const translators = await axios.get("http://localhost:3311/api/translators", "/", id,{
    headers: {  'jwt-token': tokenAcces }});
  return translators.data;
};
export const createTraducteur = async (data) => {
  const client = await axios.post("http://localhost:3311/api/translators",data,{
    headers: {  'jwt-token': tokenAcces }});
  return client;
};
export const updateTraducteur = async (data) => {
  const client = await axios.put("http://localhost:3311/api/translators",data,{
    headers: {  'jwt-token': tokenAcces }});
  return client;
};
export const deleteTraducteur = async (id) => {
  const Traducteur = await axios.delete("http://localhost:3311/api/translators"+"/"+id, "/", id,{
    headers: {  'jwt-token': tokenAcces }});
  return Traducteur;
};

export const getClient = async (id) => {
  const client = await axios.get("http://localhost:3311/api/clients", "/", id,{
    headers: {  'jwt-token': tokenAcces }});
  return client;
};

export const createClient = async (data) => {
  const client = await axios.post("http://localhost:3311/api/clients",data,{
    headers: {  'jwt-token': tokenAcces }});
  return client;
};
export const updateClient = async (data) => {
  const client = await axios.put("http://localhost:3311/api/clients",data,{
    headers: {  'jwt-token': tokenAcces }});
  return client;
};
export const deleteClient = async (id) => {
  const client = await axios.delete("http://localhost:3311/api/clients"+"/"+id, "/", id,{
    headers: {  'jwt-token': tokenAcces }});
  return client;
};

export const getAdmin = async (id) => {
  const admin = await axios.get("http://localhost:3311/api/admins", "/", id,{
    headers: {  'jwt-token': tokenAcces }});
  return admin;
};

export const createAdmin = async (data) => {
  const admin = await axios.post("http://localhost:3311/api/admins",data,{
    headers: {  'jwt-token': tokenAcces }});
  return admin;
};
export const updateAdmin = async (data) => {
  const admin = await axios.put("http://localhost:3311/api/admins",data,{
    headers: {  'jwt-token': tokenAcces }});
  return admin;
};
export const deleteAdmin = async (id) => {
  const admin = await axios.delete("http://localhost:3311/api/admins", "/", id,{
    headers: {  'jwt-token': tokenAcces }});
  return admin;
};