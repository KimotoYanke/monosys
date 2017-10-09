FROM node:latest

ENV PORT 3000

RUN git clone --depth 1 https://github.com/kimotoshin/monosys.git
WORKDIR monosys
RUN yarn
RUN yarn build

CMD ["npm", "start"]
