---
layout: post
title:  "Setting up llvm for inkwell on macOS"
date:   2022-05-28 10:00:00 +0700
categories: [llvm, compilers, inkwell, rust]
---

```bash
git clone https://github.com/llvm/llvm-project.git
cd llvm-project
git checkout remotes/origin/release/13.x
mkdir build && cd build
cmake ../llvm -DCMAKE_INSTALL_PREFIX=$HOME/llvm-13
cmake --build . --target install
```

I'm compiling LLVM for use with [inkwell](https://thedan64.github.io/inkwell/inkwell/index.html) which relies on the `LLVM_SYS_130_PREFIX`
env variable to find llvm (for llvm 13 of course, it's different for other versions [more here](https://crates.io/crates/llvm-sys#llvm-compatibility)). 

After installing modify your shell to set this variable to `$HOME/llvm-13` or wherever you want llvm (modify the cmake DCMAKE_INSTALL_PREFIX flag as well).

If you want a version other than 13 run `git branch -a` for a list of remote branches.


You can also find official instructions here: [https://llvm.org/docs/CMake.html](https://llvm.org/docs/CMake.html)
