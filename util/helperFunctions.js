class HelperFunc {
  static TrimFnc($data) {
    return $data.replace(/\s+/g, "-").toLowerCase();
  }
}

module.exports = HelperFunc;
