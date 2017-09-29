FROM node:latest

ENV PORT 80

RUN git clone --depth 1 https://github.com/kimotoshin/monosys.git
WORKDIR monosys
RUN yarn
RUN npm run build

CMD ["npm", "start"]
